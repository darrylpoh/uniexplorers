/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async (knex) => {
    return knex('image_file').del().then(
        async () => {
            return knex('image_file').insert([
                {
                    filename: 'pikachu.png',
                    filepath: 'images/pikachu.png',
                    mimetype: 'image/png',
                    size: 199910,
                },
            ])
        }
    )
};
