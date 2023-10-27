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
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Law', //  CS
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Accountancy', //  CS
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Economics', //  CS
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Computing & Law', //  CS
                },
                {
                    university_name: 'Singapore Management University', // SMU
                    tag_name: 'Social Sciences', //  CS
                },

            ])
        }
    )
};
