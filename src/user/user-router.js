const path = require('path')
const express = require('express')
const logger = require('../middleware/logger')
const xss = require('xss')
const { v4: uuid } = require('uuid');
const UserService = require('./user-service')
const { tracks, users } = require('../store-v2')

const userRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    password: xss(user.password),
    email: xss(user.email),
})

userRouter
    .route('/')
    .get((req, res) => {
        // TODO: exclude or bycrypt password + email
        let response = users;
    
        if (response.length === 0) {
            response = "No results found."
        }

        res
            .json(response);
    
    })

module.exports = userRouter