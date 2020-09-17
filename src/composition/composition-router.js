const path = require('path')
const express = require('express')
const xss = require('xss')
const CompositionService = require('./composition-service')
// v1 step_sequence
// const store = require('../store-v1')
// v2 step_sequence
const { compositions, users } = require('../store-v2')
const logger = require('../middleware/logger')

const compositionRouter = express.Router()
const jsonParser = express.json()

const serializeComposition = composition => ({
    id: composition.id,
    user_id: composition.user_id,
    title: xss(composition.title),
    public: composition.public,
    tempo: composition.tempo,
    sequence_length: composition.sequence_length,
    step_sequence: composition.step_sequence,
    mp3: composition.mp3,
})

compositionRouter
    .route('/')
    .get((req, res) => {
        let response = compositions;
        const { public, search = '' } = req.query;
    
        // query validation
        if (public) {
            if (public !== 'true' && public !== 'false') {
                res.status(400).json({ error: "Boolean required" })
            }
        }
    
        // queries valid, so proceed...
        // filter first by public/private tracks
        if (public) {
            response = response.filter(composition =>
                composition
                    .public.toString()  // convert boolean toString required
                    .includes(public.toLowerCase()));
        }
        // then filter by title, if applicable
        if (search) {
            response = response.filter(composition =>
                composition
                    .title.toLowerCase()
                    .includes(search.toLowerCase()));
        }
        if (response.length === 0) {
            response = "No results found."
        }
    
        res
            .json(response);
    
    })
    // .post(jsonParser, (req, res, next) => {
    //     const {
    //         id,
    //         user_id,
    //         title,
    //         public,
    //         tempo,
    //         sequence_length,
    //         sequence_hihat,
    //         sequence_clap,
    //         sequence_trap,
    //         sequence_bass,
    //         mp3,
    //     } = req.body
    // })

compositionRouter
    .route('/:compositionId')
    .get((req, res) => {
        const { compositionId } = req.params;
        const composition = compositions.find(c => c.id == compositionId); // NOTE use of equality operator (==) for auto type coercion.

        if (!composition) {
            logger.error(`Composition with id ${compositionId} not found.`)
            return res
                .status(404)
                .send('Track Not Found')
        }
        res
            .status(200)
            .json(composition)
    })


module.exports = compositionRouter

