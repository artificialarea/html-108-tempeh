const path = require('path')
const express = require('express')
const logger = require('../middleware/logger')
const xss = require('xss')
const TracksService = require('./tracks-service')

const tracksRouter = express.Router()
const jsonParser = express.json()

const serializeTrack = track => ({
    id: track.id,
    user_id: track.user_id,
    title: xss(track.title),
    date_modified: track.date_modified,
    visible: track.visible,
    tempo: track.tempo,
    sequence_length: track.sequence_length,
    notes: track.notes,
    checked: track.checked,
})

tracksRouter
    .route('/')
    .get((req, res, next) => {
        TracksService.getAllTracks(req.app.get('db'))
            .then(tracks => {
                res.json(tracks.map(serializeTrack))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = req.body;

        const newTrack = {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        };

        // validation
        for (const [key, value] of Object.entries(newTrack))
            if (value == null)
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
        
        TracksService.insertTrack(
            req.app.get('db'),
            newTrack
        )
            .then(track => {
                res .status(201)
                    .location(path.posix.join(req.originalUrl, `/${track.id}`)) // re:posix and req.originalUrl, see details: https://courses.thinkful.com/node-postgres-v1/checkpoint/17#-api-prefix
                    .json(serializeTrack(track))
            })
            .catch(next)         
    })

tracksRouter
    .route('/:trackId')
    .all((req, res, next) => {
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
                res.track = track
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeTrack(res.track))
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        } = req.body;
        
        const trackToUpdate = {
            user_id,
            title,
            visible,
            tempo,
            sequence_length,
            notes,
            checked,
        };

        // validation
        const numberOfValues = Object.values(trackToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'user_id', 'title', 'visible', 'tempo', 'sequence_length', 'notes' or 'checked'`
                }
            })
        
        TracksService.updateTrack(
            req.app.get('db'),
            req.params.trackId,
            trackToUpdate
        )
            .then(track => {
                res.status(204).end()
            })
            .catch(next) 
    })
    .delete((req, res, next) => {
        TracksService.deleteTrack(
            req.app.get('db'),
            req.params.trackId
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = tracksRouter