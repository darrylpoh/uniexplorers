/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('uni_forum_comment').del().then(
        async () => {
            return knex('uni_forum_comment').insert([
                { // comment ID 1
                    thread_id: 1,
                    user_email: 'jared@admin.com',
                    comment_text: 'Hello this is an admin test comment'
                },
                {
                    thread_id: 1,
                    parent_id: 1,
                    user_email: 'jared@admin.com',
                    comment_text: 'Hello this is an admin test nested comment'
                },
                {
                    thread_id: 2,
                    user_email: 'jared@notadmin.com',
                    comment_text: 'Hello this is an non-admin test comment'
                },
            ])
        }
    )
};
