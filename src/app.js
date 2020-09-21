require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV
} = require('./config')
const errorHandler = require('./middleware/error-handler')
const validateBearerToken = require('./middleware/validate-bearer-token')
const pancakeRouter = require('./pancake/pancake-router')
const usersRouter = require('./users/users-router')
const tracksRouter = require('./tracks/tracks-router')
const { v4: uuid } = require('uuid');

const app = express()

const morganOption = (NODE_ENV === 'production') 
    ? 'tiny' 
    : 'dev';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.use(express.static('public'))

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
});

app.use('/api/pancakes', pancakeRouter)
app.use('/api/tracks', tracksRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

module.exports = app
