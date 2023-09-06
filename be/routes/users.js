const db = require('../db/knex');
const bcrypt = require('bcrypt');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/users')
        .get(authenticateToken, async (req, res) => {
            const user = await db.select().from('user').where('email', req.jwt_object.email).first(); // get user
            
            if (user.is_admin) {
                var user_obj = await db.select().from('user');
            } else {
                var user_obj = user;
            }
            
            res.json(user_obj);
        })
        .post(authenticateToken, async (req, res) => {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const token = generateAccessToken({email: req.body.email});
            
            // insert user into db
            const user = await db('user').insert({
                email: req.body.email,
                password: hashedPassword,
            }).returning('*');
            
            res.status(201).json({
                'user_data': user,
                'token': token
            });
        });
    // change password
    app.route('/users/change_password')
        .put(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqOldPassword = req.body.old_password;
            const reqNewPassword = req.body.new_password;
            const reqNewPasswordConfirm = req.body.new_password_confirm;

            if (!jwtEmail || !reqOldPassword || !reqNewPassword || !reqNewPasswordConfirm) {
                return res.status(400).send('Missing fields!');
            }

            const user = await db.select().from('user').where('email', jwtEmail).first();

            // check if user exists
            if (!user) {
                return res.status(400).send('Email or password is incorrect');
            }

            // check if password is correct
            const validPassword = await bcrypt.compare(reqOldPassword, user.password);
            if (!validPassword) {
                return res.status(400).send('Email or password is incorrect');
            }

            if (reqNewPassword != reqNewPasswordConfirm) {
                return res.status(400).send('New passwords do not match');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(reqNewPassword, salt);

            const count = await db('user').where('email', jwtEmail).update({
                password: hashedPassword,
                updated: db.fn.now()
            })

            res.status(202).json({
                updated: count,
                field: 'password'
            });
        });

    // change name
    app.route('/users/change_name')
        .put(authenticateToken, async (req, res) => {
            const reqNewName = req.body.new_name;
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first();

            // check if user exists
            if (!user) {
                return res.status(400).send('Email or password is incorrect');
            }

            // change name
            const count = await db('user').where('email', jwtEmail).update({
                name: reqNewName,
                updated: db.fn.now()
            })

            res.status(202).json({
                updated: count,
                field: 'name'
            });
        });
}