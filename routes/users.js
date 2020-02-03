const express = require('express'),
    usersRouter = express.Router(),
    passport = require('passport'),
    auth = require('../middleware/authenticate'),
    User = require('../models/user'),
    fs = require('fs'),
    Jimp = require('../jimp')

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

// /user/:_id route
usersRouter.route('/:_id') // Updates user account
    .put(auth.verifyAccess, (req, res, next) => {
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
    .get(auth.verifyAccess, (req, res, next) => { // Gets user data
        const { _id } = req.params

        User.findOne({ _id }, (err, user) => {
            if (err)
                return res.json({ success: false })

            if (user) {
                const userData = {
                    phone: user.phone,
                    dob: user.dob,
                }

                res.json(userData)
                return true
            }
        })
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

// Uploads a new image for user
usersRouter.post('/profilepicture/:_id', auth.verifyAccess, (req, res, next) => {
    const { _id } = req.params,
        { image } = req.body,
        base64Image = image.split(';base64,').pop()

    fs.writeFile(`./public/images/profileimage/${_id}.png`, base64Image, { encoding: 'base64' }, err => {
        if (err)
            return res.json({ success: false, err })

        Jimp([`./public/images/profileimage/${_id}.png`], 500, undefined, 80)

        User.findByIdAndUpdate({ _id }, { profileImg: `${_id}.png` }, (err, user) => {
            if (err)
                return res.json({ success: false, err })

            return res.json({ success: true })
        })
    })
})

// Logs user out
usersRouter.get('/logout', auth.verifyAccess, (req, res, next) => {
    req.logOut() // Logs user out
    res.end() // Ends request
})

module.exports = usersRouter
