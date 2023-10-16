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
                {
                    email: "alice@studentsworld.com",
                    name: "Alice",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "bob@collegelife.net",
                    name: "Bob",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "charlie@educationhub.com",
                    name: "Charlie",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "daniel@adventurouslearner.com",
                    name: "Daniel",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "emily@globetrotter.edu",
                    name: "Emily",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "frank@knowledgeseeker.com",
                    name: "Frank",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "grace@africaexplorer.com",
                    name: "Grace",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "henry@adventuresinAfrica.net",
                    name: "Henry",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "isabella@studyinafrica.org",
                    name: "Isabella",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "jackson@europeanexperience.com",
                    name: "Jackson",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "karen@euroadventures.net",
                    name: "Karen",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "leo@europelearner.org",
                    name: "Leo",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "mia@northamericanstudies.com",
                    name: "Mia",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "nathan@learninNA.net",
                    name: "Nathan",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "olivia@naeducationexplorer.com",
                    name: "Olivia",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "peter@southamericadreams.com",
                    name: "Peter",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "quinn@exploreSA.org",
                    name: "Quinn",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                },
                {
                    email: "rachel@saexplorer.net",
                    name: "Rachel",
                    password: await bcrypt.hash("password", 10),
                    is_admin: false
                }

            ]);
        });
};
