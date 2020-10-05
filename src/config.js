module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://plastikmann@localhost/html_108',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://plastikmann@localhost/html_108-test',
    // CONDITIONAL API TOKEN
    // process.env (for local testing) || explict in config.js (for production deploy)
    API_TOKEN: process.env.API_TOKEN || 'd7a2f72d-4729-49ec-b5fb-2862264564c7',
}
