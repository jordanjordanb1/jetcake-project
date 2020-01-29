const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        match: /\S+@\S+\.\S+/
    },
    phone: {
        required: true,
        type: Number,
        match: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    },
    dob: {
        required: true,
        type: String,
        match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    },
    security_questions: [],
    address: {
        required: false,
        type: String
    }
}, { timestamps: true })

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
