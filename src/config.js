module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://plastikmann@localhost/html_108',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://plastikmann@localhost/html_108-test',
    API_TOKEN: process.env.API_TOKEN || 'bd002aaa-1960-42a7-9afe-12edbd2ed9f3',
}
