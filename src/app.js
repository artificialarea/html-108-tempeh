require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
    NODE_ENV
} = require('./config')
const errorHandler = require('./middleware/error-handler')
const pancakeRouter = require('./pancake/pancake-router')
const userRouter = require('./user/user-router')
const compositionRouter = require('./composition/composition-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'dev';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

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

    // SEARCH PARAM
    // const { search = '' } = req.query;
    // let results = fauxCompositionData
    //     .filter(composition =>
    //         composition
    //             .title.toLowerCase()
    //             .includes(search.toLowerCase()));

    // PUBLIC PARAM
    // need to convert boolean toString
    const { public } = req.query;
    let results = fauxCompositionData
        .filter(composition =>
            composition
                .public.toString()
                .includes(public.toLowerCase()));

    res
        // .json(fauxCompositionData);
        .json(results);

})

app.use('/api/pancakes', pancakeRouter)
// app.use('/api/users', userRouter)
// app.user('/api/compositions', compositionRouter)
app.use(errorHandler)

module.exports = app
