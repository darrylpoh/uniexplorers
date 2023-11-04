require('dotenv').config()

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT, UNIX_SOCKET } = process.env

module.exports = {
    development: {
        client: CLIENT,
        connection: {
            database: DATABASE,
            user: PG_USER,
            password: PASSWORD,
            host: HOST,
            port: PG_PORT
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'uniexplorers',
            user: 'postgres',
            password: 'postgres',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'pg',
        connection: {
            database: DATABASE,
            user: PG_USER,
            password: PASSWORD,
            host: UNIX_SOCKET,
            port: PG_PORT,
        },
        pool: {
            min: 2,
            max: 80,
        },
        // migrations: {
        //     tableName: 'knex_migrations',
        // },
        acquireConnectionTimeout: 60000
    },
}