const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/uni_users')
        .get(authenticateToken, async (req, res) => {
            // list all users, and their corresponding universities
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                db
                    .select()
                    .from('uni_user')
                    .then(
                        results => {
                            res.json(results)
                        }
                    )
                    .catch(err => res
                        .status(404)
                        .json({
                            success: false,
                            message: 'user database query failed',
                            stack: err.stack,
                        })
                    );
            } else {
                db
                    .select()
                    .from('uni_user')
                    .where('user_email', jwtEmail)
                    .then(
                        results => {
                            res.json(results)
                        }
                    )
                    .catch(err => res
                        .status(404)
                        .json({
                            success: false,
                            message: 'user database query failed',
                            stack: err.stack,
                        })
                    );
            }
            
            res.json(uniUsers);
        })
}