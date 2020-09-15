const path = require('path')
const express = require('express')
const xss = require('xss')
const CompositionService = require('./composition-service')

const compositionRouter = express.Router()
const jsonParser = express.json()

const serializeComposition = composition => ({
    id: composition.id,
    user_id: composition.user_id,
    title: xss(composition.title),
    public: composition.public,
    tempo: composition.tempo,
    sequence_length: composition.sequence_length,
    sequence_hihat: composition.sequence_hihat,
    sequence_clap: composition.sequence_clap,
    sequence_trap: composition.sequence_trap,
    sequence_bass: composition.sequence_bass,
    mp3: composition.mp3,
})

compositionRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {
            id,
            user_id,
            title,
            public,
            tempo,
            sequence_length,
            sequence_hihat,
            sequence_clap,
            sequence_trap,
            sequence_bass,
            mp3,
        } = req.body
    })


module.exports = compositionRouter