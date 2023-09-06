const db = require('../db/knex');

module.exports = app => {
    app.route('/uni_tags')
        .get(async (req, res) => {
            // list all uni tags
            const uniTags = await db.select().from('uni_tag');
            res.json(uniTags);
        });
}