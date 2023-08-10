const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: ""
      },
      avatarURL: {
        type: String,
        require: true
      }
}, {versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
password: Joi.string().min(6).required(),
email: Joi.string().pattern(emailRegex).required(),
subscription: Joi.string().valid("starter", "pro", "business"),
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
    })

const subscriptionSchema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business').required(),
    });

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema
}    

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
}