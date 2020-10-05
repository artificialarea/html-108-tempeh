module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://plastikmann@localhost/html_108',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://plastikmann@localhost/html_108-test',

    // CONDITIONAL API TOKEN
    // process.env (for local testing) || explict in config.js (for production deploy)
    // [[ in .env 
    // API_TOKEN='bd002aaa-1960-42a7-9afe-12edbd2ed9f3'
    // ]]
    // API_TOKEN: process.env.API_TOKEN || 'd7a2f72d-4729-49ec-b5fb-2862264564c7',
    // ^^^ ... but it didn't work >_<

    // So back to this for now
    // [[ in .env 
    // API_TOKEN='d7a2f72d-4729-49ec-b5fb-2862264564c7'
    // ]]
    API_TOKEN: process.env.API_TOKEN || 'bd002aaa-1960-42a7-9afe-12edbd2ed9f3',


}
