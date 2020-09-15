const path = require('path')
const express = require('express')
const xss = require('xss')
const UserService = require('./user-service')

const userRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    password: xss(user.password),
    email: xss(user.email),
})

module.exports = userRouter