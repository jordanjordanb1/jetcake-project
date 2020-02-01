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
    passport.authenticate('local', (err, user, info) => { // Verifies if the email and password is correct
        if (err) {
            next(err)
            return res.send({ success: false, message: "An unknown error occured" })
        }

        // No user was found so either email or password was incorrect
        if (!user)
            return res.send({ success: false, message: "Email or password is incorrect" });

        // User was found, so login passport
        req.login(user, { session: false }, (err) => {
            err ? next(err) : null // Unknown error occurred

            const token = this.getToken(user._id),
                security_questions = user.security_questions || '',
                address = user.address || '',
                profileImg = user.profileImg || ''

            res.status(200).setHeader('Authorization', `Bearer ${token}`) // Sets auth header with token
            return res.send({ success: true, token, user: { security_questions, address, profileImg } })
        })
    })(req, res, next)
}

exports.verifyAccess = passport.authenticate('jwt', { session: false }) // Checks if a jwt token is in auth header and valid
