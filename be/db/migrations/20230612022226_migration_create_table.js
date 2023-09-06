/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/*
Uni Database
uni ID
Name
Semester
Location
GPA
Duration
Flavor Text

Tags
Name

Reviews
User ID FK
Uni ID FK
Review Content

UniTag
Uni ID
Tag ID
*/
exports.up = function(knex) {
    return knex.schema.withSchema('public')
        .createTable('image_files', (table) => {
            table.increments('id').primary();
            table.string('filename').notNullable().unique();
            table.string('filepath').notNullable();
            table.string('mimetype').notNullable();
            table.bigInteger('size').notNullable();
        })
        .createTable('university', (table) => {
            table.string('name').primary();
            table.string('location').notNullable();
            table.enum('continent', ['Asia', 'Africa', 'North America', 'South America', 'Europe', 'Australia']).defaultTo(null);
            table.float('gpa');
            table.integer('image_id').index().references('id').inTable('image_files').defaultTo(null);
            table.text('flavor_text');
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
        })
        .createTable('user', (table) => {
            table.string('email').primary().notNullable();
            table.string('name').notNullable();
            table.varchar('password', 255).notNullable();
            // backend user info
            table.boolean('is_admin').notNullable();
            // default unset user info
            table.integer('image_id').index().references('id').inTable('image_files').defaultTo(null);
            table.boolean('is_alumni').defaultTo(false);
            table.integer('year_on_exchange').defaultTo(null);
            table.integer('exchange_duration').defaultTo(null);
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
        })
        .createTable('tag', (table) => {
            table.string('name').primary();
        })
        .createTable('review', (table) => {
            table.increments('id').primary();
            table.string('user_email').index().references('email').inTable('user');
            table.string('university_name').index().references('name').inTable('university');
            table.text('review_text').notNullable();
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
        })
        .createTable('uni_tag', (table) => {
            table.string('university_name').index().references('name').inTable('university');
            table.string('tag_name').index().references('name').inTable('tag');
            table.primary(['university_name', 'tag_name']);
        })
        .createTable('uni_exchange', (table) => {
            table.string('university_name').index().references('name').inTable('university');
            table.string('duration').notNullable();
            table.primary(['university_name', 'duration']);
        })
        .createTable('uni_user', (table) => {
            table.string('university_name').index().references('name').inTable('university');
            table.string('user_email').index().references('email').inTable('user');
            table.boolean('is_home').notNullable().defaultTo(true); // true - home, false - exchange
            table.primary(['university_name', 'user_email']);
        })
        ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user')
        .dropTableIfExists('university')
        .dropTableIfExists('tag')
        .dropTableIfExists('review')
        .dropTableIfExists('uni_tag')
        .dropTableIfExists('uni_exchange')
        .dropTableIfExists('uni_user')
        .dropTableIfExists('image_files');
};