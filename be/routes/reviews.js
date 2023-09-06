const db = require('../db/knex');
const {authenticateToken} = require('../modules/jwt_utils.js');

module.exports = app => { 
    app.route('/reviews')
        .get(authenticateToken, async (req, res) => {
            // list all reviews
            const jwtEmail = req.jwt_object.email;

            const user = await db.select().from('user').where('email', jwtEmail).first(); // get user
            
            if (user.is_admin) {
                var reviews = await db.select().from('review');
            } else {
                const user_email = user.email;
                // console.log('User goes to', uni_name);
                var reviews = await db.select().from('review').where('user_email', user_email);
            }
            
            res.json(reviews);
        })
        .post(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reqReviewText = req.body.review_text;

            if (!reqReviewText) {
                return res.status(400).send('Missing review field');
            }

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const user_email = user.email;
            const user_university = user.university;

            const review_obj = await db('review').insert({
                user_email: user_email,
                university_name: user_university,
                review_text: reqReviewText
            }).returning("*");

            res.status(201).json(review_obj);
        })
        .patch(authenticateToken, async (req, res) => {
            const jwtEmail = req.jwt_object.email;
            const reviewId = req.body.review_id;
            const newReview = req.body.review_text;

            const user = await db.select().from('user').where('email', jwtEmail).first();
            const reviewObj = await db.select().from('review').where('id', reviewId).first();

            if (!reviewObj) {
                return res.status(400).send("Review does not exist");
            }

            if (reviewObj.user_email != user.email || !user.is_admin) {
                return res.status(400).send("No permission to edit review");
            }

            const count = await db('review').where('id', reviewId).update({
                review_text: newReview,
                updated: db.fn.now()
            })

            res.status(200).json({updated: count});
        });
    };