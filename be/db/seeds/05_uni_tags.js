/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('uni_tag').del().then(
        async () => {
            return knex('uni_tag').insert([
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Information Systems', //  IS
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Business', //  Biz
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Computer Science', //  CS
                },
                {
                    university_name: 'National University of Singapore', // NUS
                    tag_name: 'Information Systems', //  IS
                },
                {
                    university_name: 'National University of Singapore', // NUS
                    tag_name: 'Business', //  Biz
                },
                {
                    university_name: 'National University of Singapore', // NUS
                    tag_name: 'Computer Science', //  CS
                },
            ])
        }
    )
};
