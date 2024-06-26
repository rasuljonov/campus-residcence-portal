const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(new RegExp('^\\+?[0-9]{9,14}$')).required(),
    role: Joi.string().valid('Student', 'Staff', 'Admin').required(),
});

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),

})

const roomRequestSchema = Joi.object({
    roomId: Joi.number().integer().required(),
    passportNumber: Joi.string().regex(/^[A-Z]{2}\d{7}$/).required().messages({
        'string.pattern.base': `"passportNumber" should start with two letters followed by seven digits`
    }),
    city: Joi.string().valid('Andijan', 'Bukhara', 'Ferghana', 'Jizzakh', 'Khorezm').required().messages({
        'any.only': `"city" must be one of the following: Andijan, Bukhara, Ferghana, Jizzakh, Khorezm`,
        'any.required': `"city" is a required field`
    })
});

const staffSchema = Joi.object({
    

});

module.exports = { registerSchema, loginSchema, roomRequestSchema};
