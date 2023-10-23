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
        .createTable('image_file', (table) => {
            table.increments('id').primary();
            table.string('filename').notNullable().unique();
            table.string('filepath').notNullable();
            table.string('mimetype').notNullable();
            table.bigInteger('size').notNullable();
        })
        .createTable('university', (table) => {
            table.string('name').primary();
            table.string('location').notNullable();
            table.enum('continent', ['Asia', 'Africa', 'North America', 'South America', 'Europe', 'Oceania', 'Middle East']).defaultTo(null);
            table.float('gpa_10_percentile').defaultTo(null);
            table.float('gpa_90_percentile').defaultTo(null);
            table.string('image_filename').index().references('filename').inTable('image_file').defaultTo('pikachu.png');
            table.text('flavor_text');
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
        })
        .createTable('user', (table) => {
            table.string('email').primary().notNullable();
            table.string('name').notNullable();
            table.varchar('password', 255).notNullable();
            table.string('flavor_text').notNullable().defaultTo("Life-long learner")
            // backend user info
            table.boolean('is_admin').notNullable().defaultTo(false);
            // default unset user info
            table.string('image_filename').index().references('filename').inTable('image_file').defaultTo('pikachu.png');
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
        .createTable('uni_forum_thread', (table) => {
            table.increments('id').primary();
            table.string('university_name').index().references('name').inTable('university');
            table.string('user_email').index().references('email').inTable('user');
            table.text('forum_title').notNullable();
            table.text('forum_text').notNullable();
            table.text('forum_text_raw').notNullable()
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
        })
        .createTable('uni_forum_comment', (table) => {
            table.increments('id').primary();
            table.string('user_email').index().references('email').inTable('user');
            table.integer('thread_id').index().references('id').inTable('uni_forum_thread').notNullable();
            table.integer('parent_id').index().references('id').inTable('uni_forum_comment');
            table.integer('num_likes').defaultTo(0);
            table.integer('num_dislikes').defaultTo(0);
            table.text('comment_text').notNullable();
            table.text('comment_text_raw').notNullable();
            table.dateTime('created').defaultTo(knex.fn.now());
            table.dateTime('updated');
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
        .dropTableIfExists('image_file')
        .dropTableIfExists('uni_forum_thread')
        .dropTableIfExists('uni_forum_comment');
};
