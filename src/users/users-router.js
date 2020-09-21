const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    password: xss(user.password),
    email: xss(user.email),
})

usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'))
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { username, password, email } = req.body;
        const newUser = { username, password }; // only two fields required (NOT NULL) for validation

        // Validation
        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }
        // the other field properties then added to newUser object
        newUser.email = email;

        UsersService.insertUser(
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res .status(204)
                    .location(path.posix.join(req.originalUrl + `/${user.id}`))
                    .json(serializeUser(user))
            })
            .catch(next)
    })

usersRouter
    .route('/:userId')
    .all((req, res, next) => {
        UsersService.getUserById(
            req.app.get('db'),
            req.params.userId
        )
        .then(user => {
            if(!user) {
                return res.status(400).json({
                    error: { message: 'User doesn\'t exist' }
                })
            }
            res.user = user;
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .patch(jsonParser, (req, res, next) => {
        const { username, password, email } = req.body;
        const userToUpdate = { username, password, email };

        // Validation
        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'username', 'password', or 'email'`
                }
            })

        UsersService.updateUser(
            req.app.get('db'),
            req.params.userId,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.userId
        )
            .then(() => {  
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = usersRouter