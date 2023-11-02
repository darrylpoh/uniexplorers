const db = require('../db/knex');
const bcrypt = require('bcrypt');

const {generateAccessToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/login')
        .post(async (req, res) => {
            // retrieve user from db
            const reqEmail = req.body.email;
            const reqPassword = req.body.password;

            if (!reqEmail || !reqPassword) {
                return res.status(400).send("Either username or password missing");
            }

            const user = await db.select(
                "email",
                "name",
                "password",
                "created",
                "updated",
                "is_admin",
                "image_filename"
            ).from('user').where('email', reqEmail).first();

            // check if user exists
            if (!user) {
                return res.status(400).send('Email or password is incorrect');
            }

            // check if password is correct
            const validPassword = await bcrypt.compare(reqPassword, user.password);
            if (!validPassword) {
                return res.status(400).send('Email or password is incorrect');
            }

            const token = generateAccessToken(req.body.email);

            delete user.password

            res.json({
                'token': token,
                'user_data': user
            });
        });
}

