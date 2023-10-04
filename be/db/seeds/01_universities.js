/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('university').del().then(
        async () => {
            return knex('university').insert([
                {
                    name: 'Singapore Management University',
                    location: 'Singapore',
                    continent: 'Asia',
                    gpa: 2.0,
                    flavor_text: 'Small',
                },
                {
                    name: 'National University of Singapore',
                    location: 'Singapore',
                    continent: 'Asia',
                    gpa: 3.0,
                    flavor_text: 'Far',
                    image_filename: 'pikachu.png'
                },
                {
                    name: 'Test Africa',
                    location: 'Johannesburg',
                    continent: 'Africa',
                    gpa: 3.0,
                    flavor_text: 'Far',
                },
                {
                    name: 'Test Europe',
                    location: 'Berlin',
                    continent: 'Europe',
                    gpa: 3.5,
                    flavor_text: 'Far',
                },
                {
                    name: 'Test NA',
                    location: 'Wisconsin',
                    continent: 'North America',
                    gpa: 3.5,
                    flavor_text: 'Far',
                },
                {
                    name: 'Test SA',
                    location: 'Bogota',
                    continent: 'South America',
                    gpa: 3.5,
                    flavor_text: 'Far',
                },
            ])
        }
    )
};
