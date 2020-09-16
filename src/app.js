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
const userRouter = require('./user/user-router')
const compositionRouter = require('./composition/composition-router')

const app = express()

const morganOption = (NODE_ENV === 'production') 
    ? 'tiny' 
    : 'dev';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())
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

// v1 step_sequence
// const fauxCompositionData = require('./faux-composition-data')
// v2 step_sequence
const fauxCompositionData = require('./faux-composition-data-v2')
app.get('/faux-tracks', (req, res) => {
    let response = fauxCompositionData;
    const { public, search = '' } = req.query;

    // query validation
    if (public) {
        if (public !== 'true' && public !== 'false') {
            res.status(400).json({ error: "Boolean required" })
        }
    }

    // queries valid, so proceed...
    if (public) {
        response = response.filter(composition =>
            composition
                .public.toString()  // convert boolean toString required
                .includes(public.toLowerCase()));
    }
    if (search) {
        response = response.filter(composition =>
            composition
                .title.toLowerCase()
                .includes(search.toLowerCase()));
    }

    res
        // .json(fauxCompositionData);
        .json(response);

})

app.use('/api/pancakes', pancakeRouter)
// app.use('/api/users', userRouter)
// app.user('/api/compositions', compositionRouter)
app.use(errorHandler)

module.exports = app
