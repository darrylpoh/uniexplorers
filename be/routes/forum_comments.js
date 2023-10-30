const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/forum/comments')
        .get(authenticateToken, async (req, res) => {
            // list all threads
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                db
                    .select()
                    .from('uni_forum_comment')
                    .then(
                        results => {
                            res.json(results)
                        }
                    )
                    .catch(err => res
                        .status(404)
                        .json({
                            success: false,
                            message: 'uni forum comment database query failed',
                            stack: err.stack,
                        })
                    );
            } else {
                const user_email = user.email;
                // console.log('User goes to', uni_name);
                db
                    .select()
                    .from('uni_forum_comment')
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
                            message: 'uni forum comment database query failed',
                            stack: err.stack,
                        })
                    );
            }
            
            // res.json(threads);
        })
        .post(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqCommentText = req.body.comment_text;
            const reqCommentTextRaw = req.body.comment_text_raw;
            const parentId = req.body.parent_id;
            const threadId = req.body.thread_id;

            if (!reqCommentText) {
                return res.status(400).send('Missing comment text field');
            }

            if (!threadId) {
                return res.status(400).send('Missing thread_id field');
            }

            const threadObj = await db.select().from('uni_forum_thread').where('id', threadId).first();

            if (!threadObj) {
                return res.status(400).send('Invalid thread_id field')
            }

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const user_email = user.email;
            // const user_university = user.university;

            if (!parentId) {
                const thread_obj = await db('uni_forum_comment').insert({
                    user_email: user_email,
                    thread_id: threadId,
                    comment_text: reqCommentText,
                    comment_text_raw: reqCommentTextRaw
                }).returning("*");

                res.status(201).json(thread_obj);
            } else {
                const thread_obj = await db('uni_forum_comment').insert({
                    user_email: user_email,
                    thread_id: threadId,
                    parent_id: parentId,
                    comment_text: reqCommentText,
                    comment_text_raw: reqCommentTextRaw
                }).returning("*");

                res.status(201).json(thread_obj);
            }

        })
        .patch(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const commentId = req.body.comment_id;
            const newComment = req.body.comment_text;

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const commentObj = await db.select().from('uni_forum_comment').where('id', commentId).first();

            if (!commentObj) {
                return res.status(400).send("Thread does not exist");
            }

            if (commentObj.user_email != user.email || !user.is_admin) {
                return res.status(400).send("No permission to edit thread");
            }

            const count = await db('uni_forum_thread').where('id', commentId).update({
                comment_text: newComment,
                updated: db.fn.now()
            })

            res.status(200).json({updated: count});
        });
    app.route('/forum/comments/:thread_id')
        .get(async (req, res) => {
            // list all threads
            // const jwtEmail = req.jwt_object.email;

            // const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
                // console.log('User goes to', uni_name);

            const {thread_id} = req.params;
            db
                .select(
                    'uni_forum_comment.*', 
                    'user.name as user_name', 
                    'user.image_filename as user_image_filename'
                )
                .from('uni_forum_comment')
                // .where('user_email', user_email)
                .leftJoin('user', 'uni_forum_comment.user_email', 'user.email')
                .where('thread_id', thread_id)
                .orderBy("created", "desc")
                .then(
                    // results => {
                    //     res.json(results)
                    // }
                    results => {
                        const map = {};
                        results.forEach(comment => {
                            comment.children = []; // initialize children array for each comment
                            map[comment.id] = comment;
                        });

                        // Construct the nested structure
                        const result = [];
                        results.forEach(comment => {
                            if (comment.parent_id === null) {
                                // Root comment
                                result.push(comment);
                            } else if (map[comment.parent_id]) {
                                // Nested comment
                                map[comment.parent_id].children.push(comment);
                            }
                        });

                        Object.values(map).forEach(comment => {
                            comment.children.sort((a, b) => b.created - a.created);
                        });                

                        res.json(result)
                    }
                )
                .catch(err => res
                    .status(404)
                    .json({
                        success: false,
                        message: 'uni forum comment database query failed',
                        stack: err.stack,
                    })
                );
            }
        )
}
