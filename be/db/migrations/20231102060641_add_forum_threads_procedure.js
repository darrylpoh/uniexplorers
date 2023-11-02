/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw(`
        CREATE OR REPLACE FUNCTION insert_forum_threads()
        RETURNS TRIGGER AS $$
        DECLARE
            new_uni_name VARCHAR;
        BEGIN
            new_uni_name := NEW.name;

            INSERT INTO uni_forum_thread (university_name, forum_title, forum_text, forum_text_raw, user_email)
            VALUES
            (new_uni_name, 'Budget', 'Discuss and share information about the university budget.', 'Discuss and share information about the university budget.', 'jared@admin.com'),
            (new_uni_name, 'Accommodation', 'Find and share information about accommodation options.', 'Find and share information about accommodation options.', 'jared@admin.com'),
            (new_uni_name, 'AMA', 'Ask Me Anything! Get to know more about the university.', 'Ask Me Anything! Get to know more about the university.', 'jared@admin.com'),
            (new_uni_name, 'Who''s going', 'Connect with other students who are going to this university.', 'Connect with other students who are going to this university.', 'jared@admin.com'),
            (new_uni_name, 'What to do', 'Share and discuss things to do around the university.', 'Share and discuss things to do around the university.', 'jared@admin.com');

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER insert_forum_threads_trigger
        AFTER INSERT ON university
        FOR EACH ROW
        EXECUTE FUNCTION insert_forum_threads();
    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw(`
        DROP TRIGGER IF EXISTS insert_forum_threads_trigger ON university;
        DROP FUNCTION IF EXISTS insert_forum_threads;
    `);
};
