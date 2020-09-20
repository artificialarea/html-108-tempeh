const path = require('path')
const express = require('express')
const logger = require('../middleware/logger')
const xss = require('xss')
const { v4: uuid } = require('uuid');
const trackService = require('./track-service')
const { tracks, users } = require('../store-v2')

const trackRouter = express.Router()
const jsonParser = express.json()

const serializetrack = track => ({
    id: track.id,
    user_id: track.user_id,
    title: xss(track.title),
    visible: track.visible,
    tempo: track.tempo,
    sequence_length: track.sequence_length,
    step_sequence: track.step_sequence,
    mp3: track.mp3,
})

trackRouter
    .route('/')
    .get((req, res) => {
        let response = tracks;
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
            response = response.filter(track =>
                track
                    .visible.toString()  // convert boolean toString required
                    .includes(visible.toLowerCase()));
        }
        // then filter by title, if applicable
        if (search) {
            response = response.filter(track =>
                track
                    .title.toLowerCase()
                    .includes(search.toLowerCase()));
        }
        if (response.length === 0) {
            response = "No results found."
        }

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
            audio_sequence,
            step_sequence,
            // completed = false
        } = req.body;

        const id = uuid();
        const newtrack = {
            id,
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            audio_sequence,
            step_sequence,
        };

        // validation
        for (const [key, value] of Object.entries(newtrack))
            if (value == null)
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
        
        // user validation unnecessary as automated client-side, but nonetheless...
        const user = users.find(u => u.id == newtrack.user_id); 

        if (!user) {
            logger.error(`User with id ${newtrack.user_id} not found.`)
            return res
                .status(404)
                .json('User Not Found')
        }

        // newtrack.completed = completed;
            
        tracks.push(newtrack);
        logger.info(`track with id ${id} created`);

        res .status(201)
            .location(`http://localhost:8000/track/${id}`)
            .json(newtrack)
                
    })

trackRouter
    .route('/:trackId')
    .get((req, res) => {
        const { trackId } = req.params;
        const track = tracks.find(c => c.id == trackId); // NOTE use of equality operator (==) for auto type coercion.

        if (!track) {
            logger.error(`track with id ${trackId} not found.`)
            return res
                .status(404)
                .send('Track Not Found')
        }
        res
            .status(200)
            .json(track)
    })


module.exports = trackRouter

