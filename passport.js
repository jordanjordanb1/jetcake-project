const JWTStrategy = require('passport-jwt').Strategy,
    passport = require('passport'),
    User = require('./models/user'),
    { secret } = require('./config'),
    ExtractJWT = require('passport-jwt').ExtractJwt

const opt = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const JwtStrategy = new JWTStrategy(opt, (payload, done) => {
    try {
        console.log(payload)
        User.findById({ _id: payload._id }).then(user => {
            if (user) {
                console.log('user found in db of passport')
                done(null, user)
            } else {
                console.log('user not found in db of passport')
                done(null, false)
            }
        })
    } catch (e) {
        done(e)
    }
})


module.exports = {
    initialize: () => {
        return passport.initialize()
    },
    createLocalStrategy: () => {
        return passport.use(User.createStrategy())
    },
    createJwtStrategy: () => {
        return passport.use('jwt', JwtStrategy)
    }
}
