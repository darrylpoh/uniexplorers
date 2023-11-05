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

        CREATE OR REPLACE FUNCTION insert_forum_thread_comment_likes()
        RETURNS TRIGGER AS $$
        BEGIN
        -- Increase num_likes in comments table and add comment_id to user's comment_liked array
        UPDATE uni_forum_comment
        SET num_likes = num_likes + 1
        WHERE id = NEW.comment_id;

        UPDATE "user"
        SET comment_liked = array_append(comment_liked, NEW.comment_id)
        WHERE email = NEW.user_email;

        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER insert_forum_thread_comment_likes_trigger
        AFTER INSERT ON comment_likes
        FOR EACH ROW
        EXECUTE FUNCTION insert_forum_thread_comment_likes();

        CREATE OR REPLACE FUNCTION delete_forum_thread_comment_likes()
        RETURNS TRIGGER AS $$
        BEGIN
        -- Decrease num_likes in comments table and remove comment_id from user's comment_liked array
        UPDATE uni_forum_comment
        SET num_likes = num_likes - 1
        WHERE id = OLD.comment_id;

        UPDATE "user"
        SET comment_liked = array_remove(comment_liked, OLD.comment_id)
        WHERE email = OLD.user_email;

        RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER delete_forum_thread_comment_likes_trigger
        AFTER DELETE ON comment_likes
        FOR EACH ROW
        EXECUTE FUNCTION delete_forum_thread_comment_likes();



        CREATE OR REPLACE FUNCTION insert_forum_thread_comment_dislikes()
        RETURNS TRIGGER AS $$
        BEGIN
        -- Increase num_dislikes in comments table and add comment_id to user's comment_disliked array
        UPDATE uni_forum_comment
        SET num_dislikes = num_dislikes + 1
        WHERE id = NEW.comment_id;

        UPDATE "user"
        SET comment_disliked = array_append(comment_disliked, NEW.comment_id)
        WHERE email = NEW.user_email;

        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER insert_forum_thread_comment_dislikes_trigger
        AFTER INSERT ON comment_dislikes
        FOR EACH ROW
        EXECUTE FUNCTION insert_forum_thread_comment_dislikes();

        CREATE OR REPLACE FUNCTION delete_forum_thread_comment_dislikes()
        RETURNS TRIGGER AS $$
        BEGIN
        -- Decrease num_dislikes in comments table and remove comment_id from user's comment_disliked array
        UPDATE uni_forum_comment
        SET num_dislikes = num_dislikes - 1
        WHERE id = OLD.comment_id;

        UPDATE "user"
        SET comment_disliked = array_remove(comment_disliked, OLD.comment_id)
        WHERE email = OLD.user_email;

        RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER delete_forum_thread_comment_dislikes_trigger
        AFTER DELETE ON comment_dislikes
        FOR EACH ROW
        EXECUTE FUNCTION delete_forum_thread_comment_dislikes();


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

        DROP TRIGGER IF EXISTS insert_forum_thread_comment_likes_trigger ON comment_likes;
        DROP FUNCTION IF EXISTS insert_forum_thread_comment_likes;

        DROP TRIGGER IF EXISTS delete_forum_thread_comment_likes_trigger ON comment_likes;
        DROP FUNCTION IF EXISTS delete_forum_thread_comment_likes

        DROP TRIGGER IF EXISTS insert_forum_thread_comment_dislikes_trigger ON comment_dislikes;
        DROP FUNCTION IF EXISTS insert_forum_thread_comment_dislikes;

        DROP TRIGGER IF EXISTS delete_forum_thread_comment_dislikes_trigger ON comment_dislikes;
        DROP FUNCTION IF EXISTS delete_forum_thread_comment_dislikes
    `);
};
