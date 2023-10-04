const db = require('../db/knex');
const path = require('path');
const {authenticateToken} = require('../modules/jwt_utils.js');

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

            // console.log(taggedUnis);

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
            ).then(
                (results) => {
                    res.json(results)
                }
            )
        })

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
}