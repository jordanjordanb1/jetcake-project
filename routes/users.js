const express = require('express'),
    usersRouter = express.Router(),
    passport = require('passport'),
    auth = require('../middleware/authenticate'),
    User = require('../models/user'),
    fs = require('fs')


// User registration route
usersRouter.post('/register', async (req, res, next) => {
    const { email, password, passwordConf, phone, dob } = req.body

    // Does client side validation rules on server side to make sure form wasn't tampered with
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password) && password.length >= 6 && password.length <= 12 && password === passwordConf) {
        await User.register(new User({ email, phone, dob }), password, (err, user) => { // Registers a new user with provided credentials
            if (err) {
                // User with email was already found
                if (err.name === "UserExistsError") {
                    return res.json({ success: false, msg: "Email is already registered" })
                }

                return res.json({ success: false, msg: 'ERR: Form is invalid!' }) // There was an error, form maybe was tampered with
            } else {
                // User wasn't found; continue with auth
                passport.authenticate('local')(req, res, () => { // Checks with passport-mongoose if user exits
                    const { _id } = user,
                        token = auth.getToken(_id) // Gets a new JWT Token

                    res.status('200').setHeader('Authorization', `Bearer ${token}`) // Sets token in bearer
                    res.send({ success: true, msg: 'Registered user succesfully!', token })
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'ERR: Form is invalid!' })
    }
})

// Checks if email exists in registration form
usersRouter.get('/email/:email/verify', async (req, res, next) => {
    const { email } = req.params

    // Looks in DB to see if email is already registered
    await User.findOne({ email }, (err, user) => {
        // Unknown error, or DB is down
        if (err) {
            return res.json({ success: false, msg: "An unknown error occured!" })
        }

        if (user) {
            return res.json({ found: true }) // User was found
        } else {
            return res.json({ found: false }) // User wasn't found
        }
    })
})

// Checks if JWT Token is valid
usersRouter.get('/verifytoken', auth.verifyAccess, (req, res, next) => {
    res.json({ access: true })
})

// Updates user account
usersRouter.put('/:_id', auth.verifyAccess, (req, res, next) => {
    const body = req.body,
        { _id } = req.params

    if (
        !body['email'] ||
        !body['_id'] ||
        !body['dob'] ||
        !body['salt'] ||
        !body['hash']
    ) {
        User.findByIdAndUpdate({ _id }, { ...body }, (err, user) => {
            if (err) {
                res.json({ err, success: false })
            }

            if (user) {
                res.json({ success: true })
            } else {
                res.json({ success: false })
            }

        })
    } else {
        res.json({ success: false })
    }
})

// User login route
usersRouter.post('/login', (req, res, next) => {
    // Please see 'middlware/authentication.js'

    try {
        auth.verifyUser(req, res, next) // Verifies if user exists
    } catch (e) {
        next(e)
    }
})

usersRouter.get('/profilepicture/:_id', (req, res, next) => {
    const { _id } = req.params

    User.findOne({ _id }, (err, { profileImg }) => {
        err ? (res.json({ success: false, msg: "An unknown error occured!" })) : null

        const img = fs.createReadStream(`./public/images/profileimage/${profileImg}`),
            fileType = profileImg.split('.')[1]

        img.on('open', () => {
            res.type(fileType)
            img.pipe(res)
        })
    })
})

module.exports = usersRouter
