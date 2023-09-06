/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('review').del().then(
        async () => {
            return knex('review').insert([
                {
                    user_email: 'jared@admin.com', // jared@admin.com
                    university_name: 'Singapore Management University', // SMU
                    review_text: 'Love it my favourite university',
                },
                {
                    user_email: 'jared@notadmin.com', // jared@notadmin.com
                    university_name: 'National University of Singapore', // NUS
                    review_text: 'I know nothing about NUS',
                },
            ])
        }
    )
};
