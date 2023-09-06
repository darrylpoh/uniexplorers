/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");

exports.seed = async (knex) => {
    return knex("user").del().then(async () => {
            return knex("user").insert([
                {
                    email: "jared@admin.com",
                    name: 'Jared Admin',
                    password: await bcrypt.hash("password", 10),
                    is_admin: true,
                },
                {
                    email: "jared@notadmin.com",
                    name: 'Jared Not Admin',
                    password: await bcrypt.hash("password", 10),
                    is_admin: false,
                },
            ]);
        });
};
