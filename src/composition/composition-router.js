const path = require('path')
const express = require('express')
const logger = require('../middleware/logger')
const xss = require('xss')
const { v4: uuid } = require('uuid');
const CompositionService = require('./composition-service')
const { compositions, users } = require('../store-v2')

const compositionRouter = express.Router()
const jsonParser = express.json()

const serializeComposition = composition => ({
    id: composition.id,
    user_id: composition.user_id,
    title: xss(composition.title),
    visible: composition.visible,
    tempo: composition.tempo,
    sequence_length: composition.sequence_length,
    step_sequence: composition.step_sequence,
    mp3: composition.mp3,
})

compositionRouter
    .route('/')
    .get((req, res) => {
        let response = compositions;
        const { visible, search = '' } = req.query;
    
        // query validation
        if (visible) {
            if (visible !== 'true' && visible !== 'false') {
                res.status(400).json({ error: "Boolean required" })
            }
        }
    
        // queries valid, so proceed...
        // filter first by public/private tracks
        if (visible) {
            response = response.filter(composition =>
                composition
                    .visible.toString()  // convert boolean toString required
                    .includes(visible.toLowerCase()));
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
        console.log('response: ', response)
        res
            .json(response);
        
    
    })
    .post(jsonParser, (req, res) => {
        console.log(req.body)
        const {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            step_sequence,
            mp3,
            completed = false
        } = req.body;

        const id = uuid();
        const newComposition = {
            id,
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            step_sequence,
            mp3,
        };

        // validation
        for (const [key, value] of Object.entries(newComposition))
            if (value == null)
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
        
        // user validation unnecessary as automated client-side, but nonetheless...
        const user = users.find(u => u.id == newComposition.user_id); 

        if (!user) {
            logger.error(`User with id ${newComposition.user_id} not found.`)
            return res
                .status(404)
                .json('User Not Found')
        }

        newComposition.completed = completed;
            
        compositions.push(newComposition);
        logger.info(`Composition with id ${id} created`);

        res .status(201)
            .location(`http://localhost:8000/track/${id}`)
            .json(newComposition)
                
    })

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

