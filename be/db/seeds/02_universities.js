// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 
//  */

exports.seed = async (knex) => {
    return knex('university').del().then(
        async () => {
            return knex('university').insert([
                {
                    name: 'Singapore Management University',
                    location: 'Singapore',
                    continent: 'Asia',
                    gpa_10_percentile: 2.0,
                    gpa_90_percentile: 4.0,
                    flavor_text: 'Small',
                },
                // {
                //     name: 'National University of Singapore',
                //     location: 'Singapore',
                //     continent: 'Asia',
                //     gpa_10_percentile: 2.0,
                //     gpa_90_percentile: 4.0,
                //     flavor_text: 'Far',
                // },
                // {
                //     name: 'Test Africa',
                //     location: 'Johannesburg',
                //     continent: 'Africa',
                //     gpa_10_percentile: 2.0,
                //     gpa_90_percentile: 4.0,
                //     flavor_text: 'Far',
                // },
                // {
                //     name: 'Test Europe',
                //     location: 'Berlin',
                //     continent: 'Europe',
                //     gpa_10_percentile: 2.0,
                //     gpa_90_percentile: 4.0,
                //     flavor_text: 'Far',
                // },
                // {
                //     name: 'Test NA',
                //     location: 'Wisconsin',
                //     continent: 'North America',
                //     gpa_10_percentile: 2.0,
                //     gpa_90_percentile: 4.0,
                //     flavor_text: 'Far',
                // },
                // {
                //     name: 'Test SA',
                //     location: 'Bogota',
                //     continent: 'South America',
                //     gpa_10_percentile: 2.0,
                //     gpa_90_percentile: 4.0,
                //     flavor_text: 'Far',
                // },
            ])
        }
    )
};
