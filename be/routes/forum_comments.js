const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => {
    app.route('/forum/comments')
        .get(authenticateToken, async (req, res) => {
            // list all threads
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                var threads = await db.select().from('uni_forum_comment');
            } else {
                const user_email = user.email;
                // console.log('User goes to', uni_name);
                var threads = await db.select().from('uni_forum_comment').where('user_email', user_email);
            }
            
            res.json(threads);
        })
        .post(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqCommentText = req.body.comment_text;
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

            const thread_obj = await db('uni_forum_comment').insert({
                user_email: user_email,
                thread_id: threadId,
                comment_text: reqCommentText
            }).returning("*");

            res.status(201).json(thread_obj);
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
}
