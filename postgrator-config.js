require('dotenv').config();

// MARIUS version
// Couldn't figure out how to migrate to TEST_DATABASE_URL >_<
// So disabled... but now pancake tests fail.
// module.exports = {
//     "migrationDirectory": "migrations",
//     "driver": "pg",
//     "host": process.env.MIGRATION_DB_HOST,
//     "port": process.env.MIGRATION_DB_PORT,
//     "database": process.env.MIGRATION_DB_NAME,
//     "username": process.env.MIGRATION_DB_USER,
//     "password": process.env.MIGRATION_DB_PASS,
// }

// THINKFUL version
module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV == 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
    "ssl": !!process.env.SSL,
}
