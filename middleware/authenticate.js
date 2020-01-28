const jwt = require('jsonwebtoken'),
    passport = require('passport'),
    { secret } = require('../config')

exports.getToken = _id => {
    // Creates a new signed jwt token
    return jwt.sign({ _id }, secret, {
        expiresIn: 900000
    })
}

exports.verifyUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // Verifies if the username and password is correct
        if (err) {
            next(err)
            return res.send({ success: false, message: "An unknown error occured" })
        }

        // No user was found so either username or password was incorrect
        if (!user)
            return res.send({ success: false, message: "Username or password is incorrect" });

        // User was found, so login passport
        req.logIn(user, { session: false }, err => {
            err ? next(err) : null // Unknown error occurred

            const token = this.getToken(user._id) // Gets a new jwt token

            res.status(200).setHeader('Authorization', `Bearer ${token}`) // Sets auth header with token
            return res.send({ success: true, token })
        })
    })(req, res, next)
}

exports.verifyAccess = () => {
    return passport.authenticate('jwt', { session: false }) // Checks if a jwt token is in auth header and valid
}