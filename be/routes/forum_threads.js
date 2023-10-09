const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => { 
    app.route('/forum/threads')
        .get(authenticateToken, async (req, res) => {
            // list all threads
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                db
                    .select()
                    .from('uni_forum_thread')
                    .then(
                        results => {
                            res.json(results)
                        }
                    )
                    .catch(err => res
                        .status(404)
                        .json({
                            success: false,
                            message: 'uni forum thread database query failed',
                            stack: err.stack,
                        })
                    );
            } else {
                const user_email = user.email;
                // console.log('User goes to', uni_name);
                db
                    .select()
                    .from('uni_forum_thread')
                    .where('user_email', user_email)
                    .then(
                        results => {
                            res.json(results)
                        }
                    )
                    .catch(err => res
                        .status(404)
                        .json({
                            success: false,
                            message: 'uni forum thread database query failed',
                            stack: err.stack,
                        })
                    );
            }
            
            res.json(threads);
        })
        .post(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqForumPostText = req.body.forum_text;

            if (!reqForumPostText) {
                return res.status(400).send('Missing forum text field');
            }

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const user_email = user.email;
            const user_university = user.university;

            const thread_obj = await db('uni_forum_thread').insert({
                user_email: user_email,
                university_name: user_university,
                forum_text: reqForumPostText
            }).returning("*");

            res.status(201).json(thread_obj);
        })
        .patch(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const threadId = req.body.thread_id;
            const newThread = req.body.forum_text;

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const threadObj = await db.select().from('uni_forum_thread').where('id', threadId).first();

            if (!threadObj) {
                return res.status(400).send("Thread does not exist");
            }

            if (threadObj.user_email != user.email || !user.is_admin) {
                return res.status(400).send("No permission to edit thread");
            }

            const count = await db('uni_forum_thread').where('id', threadId).update({
                forum_text: newThread,
                updated: db.fn.now()
            })

            res.status(200).json({updated: count});
        })

        app.route('/forum/:university')
        .get(async (req, res) => {
            const {university} = req.params;

            db
                .select()
                .from('uni_forum_thread')
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
    };