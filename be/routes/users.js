const db = require('../db/knex');
const bcrypt = require('bcrypt');
const identicon = require('identicon')
const fs = require('fs')
const {authenticateToken, generateAccessToken} = require('../modules/jwt_utils.js');
const { dir } = require('console');

module.exports = app => {
    app.route('/users')
        .get(authenticateToken, async (req, res) => {
            const user = await db.select().from('user').where('email', req.jwt_object.email).first(); // get user
            
            if (user.is_admin) {
                db
                    .select()
                    .from('user')
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
                res.json(user);
            }
        })
        .post(async (req, res) => {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const token = generateAccessToken({email: req.body.email});

            const test = await db.select().from('user').where('email', req.body.email).first();

            if (test) {
                res.status(409).json({
                    "status": "Account exists already"
                })
                return
            }

            let dirToWrite = __dirname + `/../images/${req.body.email}.png`
            let absoluteDir = `images/${req.body.email}.png`
            
            // insert user into db
            const buffer = identicon.generateSync({id: req.body.email, size: 150})
            fs.writeFileSync(dirToWrite, buffer)

            const imageFilename = `${req.body.email}.png`
            db
                .insert({
                    filename: imageFilename,
                    filepath: `images/${imageFilename}`, 
                    mimetype: 'image/png', 
                    size: fs.lstatSync(absoluteDir).size
                })
                .into('image_file')
                .then(() => {
                    db('user').insert({
                        email: req.body.email,
                        password: hashedPassword,
                        name: req.body.name,
                        image_filename: imageFilename
                    })
                    .returning('*')
                    .then((user_data) => {
                            res.status(201).json({
                                'user_data': user_data,
                                'token': token
                            })
                        }
                    );
                    
                })
                .catch(err => res.json({
                    success: false,
                    message: 'upload failed',
                    stack: err.stack,
                }));
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

    app.route('/users/:university')
        .get(async (req, res) => {
            const {university} = req.params;

            db
                .select()
                .from('user')
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
                        message: 'user database query failed',
                        stack: err.stack,
                    })
                );
        })
}