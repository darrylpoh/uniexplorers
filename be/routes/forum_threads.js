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
            
            // res.json(threads);
        })
        .post(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqForumPostTitle = req.body.forum_title;
            const reqForumPostText = req.body.forum_text;
            const reqForumPostTextRaw = req.body.forum_text_raw;

            if (!reqForumPostText) {
                return res.status(400).send('Missing forum text field');
            }

            if (!reqForumPostTitle) {
                return res.status(400).send('Missing forum title field');
            }

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const user_email = user.email;
            const user_university = user.university;

            const thread_obj = await db('uni_forum_thread').insert({
                user_email: user_email,
                university_name: user_university,
                forum_text: reqForumPostText,
                forum_text_raw: reqForumPostTextRaw
            }).returning("*");

            res.status(201).json(thread_obj);
        })
        .patch(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const threadId = req.body.thread_id;
            const newThread = req.body.forum_text;
            const newThreadRaw = req.body.forum_text;

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
                forum_text_raw: newThreadRaw,
                updated: db.fn.now()
            })

            res.status(200).json({updated: count});
        })

    app.route('/forum/threads/:university')
        .get(async (req, res) => {
            const university_name = req.params.university;
            // const universityName = 'Your University Name'; // replace this with the desired university name

            db('uni_forum_thread')
            .select(
                'uni_forum_thread.id as thread_id',
                'uni_forum_thread.university_name',
                'uni_forum_thread.forum_title',
                'uni_forum_thread.forum_text',
                'uni_forum_thread.forum_text_raw',
                'uni_forum_thread.created as thread_created',
                'uni_forum_thread.updated as thread_updated',
                db.raw('COUNT(DISTINCT uni_forum_comment.id) as comment_count'),
                db.raw(`
                (
                    SELECT CONCAT(u.name, 'Ɠ', c.comment_text) 
                    FROM uni_forum_comment c
                    JOIN "user" u ON c.user_email = u.email
                    WHERE c.thread_id = uni_forum_thread.id 
                    ORDER BY c.created 
                    LIMIT 1
                ) as first_comment_text_with_name`
                )
            )
            .leftJoin('uni_forum_comment', 'uni_forum_thread.id', 'uni_forum_comment.thread_id')
            .groupBy('uni_forum_thread.id', 'uni_forum_thread.university_name', 'uni_forum_thread.forum_title', 'uni_forum_thread.forum_text', 'uni_forum_thread.forum_text_raw', 'uni_forum_thread.created', 'uni_forum_thread.updated')
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                console.error(error);
            });


            // db('uni_forum_thread')
            // .select(
            //     'uni_forum_thread.id as thread_id',
            //     'uni_forum_thread.university_name',
            //     'uni_forum_thread.forum_title',
            //     'uni_forum_thread.forum_text',
            //     'uni_forum_thread.forum_text_raw',
            //     'uni_forum_thread.created as thread_created',
            //     'uni_forum_thread.updated as thread_updated',
            //     db.raw('COUNT(DISTINCT uni_forum_comment.id) as comment_count'),
            //     // U+0193
            //     db.raw(`(
            //         SELECT CONCAT(user.name, 'Ɠ', uni_forum_comment.comment_text) 
            //         FROM uni_forum_comment 
            //         JOIN "user" ON uni_forum_comment.user_email = "user".email
            //         WHERE uni_forum_comment.thread_id = uni_forum_thread.id 
            //         ORDER BY uni_forum_comment.created 
            //         LIMIT 1
            //     ) as first_comment_text_with_name`)
            // )
            // .leftJoin('uni_forum_comment', 'uni_forum_thread.id', 'uni_forum_comment.thread_id')
            // .groupBy('uni_forum_thread.id', 'uni_forum_thread.university_name', 'uni_forum_thread.forum_title', 'uni_forum_thread.forum_text', 'uni_forum_thread.forum_text_raw', 'uni_forum_thread.created', 'uni_forum_thread.updated')
            // .then(data => {
            //     res.json(data);
            // })
            // .catch(error => {
            //     console.error(error);
            // });

            // db('uni_forum_thread')
            // .select(
            //     'uni_forum_thread.id as thread_id',
            //     'uni_forum_thread.university_name',
            //     'uni_forum_thread.forum_title',
            //     'uni_forum_thread.forum_text',
            //     'uni_forum_thread.forum_text_raw',
            //     'uni_forum_thread.created as thread_created',
            //     'uni_forum_thread.updated as thread_updated',
            //     db.raw('COUNT(DISTINCT uni_forum_comment.id) as comment_count'),
            //     db.raw('(SELECT comment_text FROM uni_forum_comment WHERE uni_forum_comment.thread_id = uni_forum_thread.id ORDER BY created LIMIT 1) as first_comment_text')
            // )
            // .leftJoin('uni_forum_comment', 'uni_forum_thread.id', 'uni_forum_comment.thread_id')
            // .groupBy('uni_forum_thread.id', 'uni_forum_thread.university_name', 'uni_forum_thread.forum_title', 'uni_forum_thread.forum_text', 'uni_forum_thread.forum_text_raw', 'uni_forum_thread.created', 'uni_forum_thread.updated')
            // .then(data => {
            //     res.json(data)
            // })
            // .catch(error => {
            //     console.error(error);
            // });

            // db('uni_forum_thread')
            //     .select(
            //         'uni_forum_thread.id as thread_id',
            //         'uni_forum_thread.forum_title',
            //         'uni_forum_thread.forum_text',
            //         'uni_forum_thread.created as thread_created',
            //         'uni_forum_thread.updated as thread_updated',
            //     )
            //     // .select(
            //     //     'uni_forum_thread.id as thread_id',
            //     //     'uni_forum_thread.forum_title',
            //     //     'uni_forum_thread.forum_text',
            //     //     'uni_forum_thread.created as thread_created',
            //     //     'uni_forum_thread.updated as thread_updated',
            //     //     'uni_forum_comment.id as comment_id',
            //     //     'uni_forum_comment.user_email as comment_user_email',
            //     //     'uni_forum_comment.comment_text',
            //     //     'uni_forum_comment.num_likes',
            //     //     'uni_forum_comment.num_dislikes',
            //     //     'uni_forum_comment.created as comment_created',
            //     //     'uni_forum_comment.updated as comment_updated',
            //     // )
            //     // // .from('uni_forum_thread')
            //     // .leftJoin('uni_forum_comment', 'uni_forum_thread.id', 'uni_forum_comment.thread_id')
            //     .where('uni_forum_thread.university_name', university_name)
            //     .orderBy('uni_forum_thread.created', 'desc')
            //     .then(data => {
            //         res.json(data)
            //     })
            //     .catch(err => res
            //         .status(404)
            //         .json({
            //             success: false,
            //             message: 'forum thread query failed',
            //             stack: err.stack
            //     }))
        })

    app.route('/forum/:thread_id')
        .get(async (req, res) => {
            const {thread_id} = req.params;

            db
                    .select()
                    .from('uni_forum_thread')
                    .where('id', thread_id)
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
        })
    };