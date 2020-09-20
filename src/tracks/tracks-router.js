const path = require('path')
const express = require('express')
const logger = require('../middleware/logger')
const xss = require('xss')
const { v4: uuid } = require('uuid');
const TracksService = require('./tracks-service')
// const { tracks, users } = require('../store-v2')

const trackRouter = express.Router()
const jsonParser = express.json()

const serializeTrack = track => ({
    id: track.id,
    user_id: track.user_id,
    title: xss(track.title),
    date_modified: track.date_modified,
    visible: track.visible,
    tempo: track.tempo,
    sequence_length: track.sequence_length,
    audio_sequence: track.audio_sequence,
    step_sequence: track.step_sequence,
})

trackRouter
    .route('/')
    .get((req, res, next) => {
        TracksService.getAllTracks(req.app.get('db'))
            .then(tracks => {
                // TODO: Reintroduce filtering by visible and search queries, per branch 'pre-db'
                res.json(tracks.map(serializeTrack))
                // res.json(tracks)
            })
            .catch(next)
    
    })
    .post(jsonParser, (req, res) => {
        console.log(req.body)
        const {
            user_id,
            title,
            // date_modified,
            visible,
            tempo,
            sequence_length,
            audio_sequence,
            step_sequence,
            // completed = false
        } = req.body;

        const id = uuid();
        const date_modified = new Date();
        const newtrack = {
            id,
            user_id,
            title,
            date_modified,
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
    .get((req, res, next) => {
        TracksService.getTrackById(
            req.app.get('db'),
            req.params.trackId
        )
            .then(track => {
                if (!track) {
                    return res.status(404).json({
                        error: { message: `Track doesn't exist`}
                    })
                }
                res.json(track)
            })
            .catch(next)
    })


module.exports = trackRouter

