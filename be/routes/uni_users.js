const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/uni_users')
        .get(authenticateToken, async (req, res) => {
            // list all users, and their corresponding universities
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                var uniUsers = await db.select().from('uni_user');
            } else {
                var uniUsers = await db.select().from('uni_user').where('user_email', jwtEmail);
            }
            
            res.json(uniUsers);
        })
}