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

const fauxCompositionData = require('./faux-composition-data')
app.get('/faux-tracks', (req, res) => {

    // with a search param
    // const { search = '' } = req.query;
    // let results = fauxCompositionData
    //     .filter(composition =>
    //         composition
    //             .title.toLowerCase()
    //             .includes(search.toLowerCase()));

    // with a public param
    // due to fetch issues, changed composition.public to string, not boolean
    const { publicity = '' } = req.query;
    let results = fauxCompositionData
        .filter(composition =>
            composition
                .public
                .includes(publicity.toLowerCase()));

    res
        // .json(fauxCompositionData);
        .json(results);

})

app.use('/api/pancakes', pancakeRouter)
// app.use('/api/users', userRouter)
// app.user('/api/compositions', compositionRouter)
app.use(errorHandler)

module.exports = app
