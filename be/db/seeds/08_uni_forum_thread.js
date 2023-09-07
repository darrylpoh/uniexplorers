/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('uni_forum_thread').del().then(
        async () => {
            return knex('uni_forum_thread').insert([
                { // thread ID 0
                    university_name: 'National University of Singapore',
                    user_email: 'jared@admin.com',
                    forum_text: 'Hello this is an admin test post'
                },
                { // thread ID 1
                    university_name: 'Singapore Management University',
                    user_email: 'jared@notadmin.com',
                    forum_text: 'Hello this is an non-admin test post'
                },
            ])
        }
    )
};
