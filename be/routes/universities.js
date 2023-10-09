const db = require('../db/knex');
const path = require('path');
const NodeCache = require('node-cache');
const {authenticateToken} = require('../modules/jwt_utils.js');
const {Trie} = require('../modules/autocomplete.js');

module.exports = app => {
    app.route('/universities')
        .get(async (req, res) => {
            // get filter params, if any
            const reqContinent = req.query.continent;
            const reqGpa = req.query.gpa;
            const reqName = req.query.name;
            const reqLocation = req.query.location;
            const reqTags = req.query.tag;

            if (reqTags) {
                if (Array.isArray(reqTags)) { // multiple tags
                    var taggedUnis = await db.distinct().pluck('university_name').from('uni_tag').whereIn('tag_name', reqTags);
                } else { // single tags
                    var taggedUnis = await db.distinct().pluck('university_name').from('uni_tag').where('tag_name', reqTags)
                }
            }

            const tags_by_uni = db.select('university_name', db.raw('string_agg(tag_name, \', \') as tags')).from('uni_tag')
            .groupBy('university_name')
            .as('TEMPtags')

            db.select().from('university').modify(
                (queryBuilder) => {
                    if (taggedUnis) { // filtered by tags?
                        if (Array.isArray(taggedUnis)) { // multiple unis
                            queryBuilder.whereIn('name', taggedUnis);
                        } else {
                            queryBuilder.where('name', taggedUnis);
                        }
                    }
                    if (reqContinent) {
                        if (Array.isArray(reqContinent)) { // multiple continent fields passed
                            queryBuilder.whereIn('continent', reqContinent);
                        } else {
                            queryBuilder.where('continent', reqContinent);
                        }
                    }
                    if (reqGpa) {
                        queryBuilder.where('gpa', '<=', reqGpa);
                    }
                    if (reqName) {
                        queryBuilder.where('name', 'ilike', `%${reqName}%`);
                    }
                    if (reqLocation) {
                        queryBuilder.where('location', reqLocation);
                    }
                }
            ).leftJoin(tags_by_uni, 'TEMPtags.university_name', 'university.name').then(
                (results) => {
                    res.json(results)
                }
            )
        });

    app.route('/universities/name/:name')
        .get(async (req, res) => {
            const { name } = req.params;
            db
                .select()
                .from('university')
                .where({name})
                .first()
                .then(university => {
                    res.json(university)
                })
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'university does not exist',
                        stack: err.stack,
                    })
                )
        });

    app.route('/universities/image/:name/')
        .get(async (req, res) => {
            const { name } = req.params;
            db
                .select()
                .from('university')
                .where({name})
                .first()
                .then(university => {
                    // university exists
                    if (university) {
                        // check if image exists
                        let filename = university.image_filename;

                        if (filename) {
                            // retrieve from DB
                            db
                                .select()
                                .from('image_file')
                                .where({filename})
                                .first()
                                .then(image => {
                                    if (image) {
                                        const dirname = path.resolve();
                                        const fullFilePath = path.join(dirname, image.filepath);
                                        return res.type(image.mimetype).sendFile(fullFilePath);
                                    }
                                    return res.status(404).send('Image does not exist');
                                })
                        } else {
                            return res.status(404).send('University has no image attached');
                        }
                    }
                }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'university does not exist',
                        stack: err.stack,
                    })
                );
        })

    var cache = {};

    const trieCache = async (req, res, next) => {
        if (!cache['trie']) {
            // console.log("Generating trie")
            const unis = await db
                .select('name')
                .from('university')
                .pluck('name');

            let uni_words = [];
            unis.forEach((uni) => uni_words.push(...uni.split(" ")))

            // const numReturn = req.params.count;

            // generate trie
            let t = new Trie();
            uni_words.forEach((uni_word) => t.insert(uni_word.toLowerCase()));

            cache['trie'] = t;
            // console.log("Trie stored into cache");
        }
        
        next();
    }

    app.route('/universities/search/:searchTerm')
        .get(trieCache, async (req, res) => {
            // pull all uni names
            const search = req.params.searchTerm;
            let searchArr = search.split(" ");
            searchArr = searchArr.map(term => term.toLowerCase())

            console.log('searchArr: ', searchArr)

            t = cache['trie'];

            let suggestions = [];
            searchArr.forEach((split_word) => suggestions.push(...t.suggest(split_word)))

            console.log('suggestions: ', suggestions)

            if (suggestions.length == 0) {
                return res.json([])
            }

            db
                .select()
                .from('university')
                // queryBuilder.where('name', 'ilike', `%${reqName}%`);
                // .whereIn('name', suggestions)
                // .whereIn("name", "ilike", )
                .where((builder) => {
                    for (let suggestion of suggestions) {
                        builder.orWhere('name', 'ilike', `%${suggestion}%`)
                    }
                })
                .then(universities =>
                    res.json(universities)
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'universities not found',
                        stack: err.stack,
                    })
                );
        })
}