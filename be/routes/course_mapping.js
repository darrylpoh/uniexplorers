const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/course_mapping/country/:country')
        .get(async (req, res) => {
            const {country} = req.params

            db
                .select()
                .from('course_mapping')
                .whereILike('country', `%${country}%`)
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'course mapping database query failed',
                        stack: err.stack,
                    })
                );
        });
    app.route('/course_mapping/course_area/:course_area')
        .get(async (req, res) => {
            const {course_area} = req.params

            db
                .select()
                .from('course_mapping')
                .whereILike('course_area', `%${course_area}%`)
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'course mapping database query failed',
                        stack: err.stack,
                    })
                );
        });
    app.route('/course_mapping/university/:university')
        .get(async (req, res) => {
            const {university} = req.params

            db
                .select()
                .from('course_mapping')
                .whereILike('university', `%${university}%`)
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'course mapping database query failed',
                        stack: err.stack,
                    })
                );
        });
    app.route('/course_mapping/course_title/:course_title')
        .get(async (req, res) => {
            const {course_title} = req.params

            db
                .select()
                .from('course_mapping')
                .whereILike('course_title', `%${course_title}%`)
                .then(
                    results => {
                        res.json(results)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'course mapping database query failed',
                        stack: err.stack,
                    })
                );
        });
}
