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

    app.route('/uni_tags/:university')
        .get(async (req, res) => {
            const {university} = req.params;

            db
                .select()
                .from('uni_tag')
                .where('university_name', university)
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'uni tag database query failed',
                        stack: err.stack,
                    })
                );
        })
}