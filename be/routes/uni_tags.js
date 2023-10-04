const db = require('../db/knex');

module.exports = app => {
    app.route('/uni_tags')
        .get(async (req, res) => {
            // list all uni tags
            db
                .select()
                .from('uni_tag')
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'uni tags database query failed',
                        stack: err.stack,
                    })
                );
        });
}