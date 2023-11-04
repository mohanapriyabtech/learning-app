import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class MentorValidator {
    constructor() {
        this.schemas = {
            signup: Joi.object({
                mentor_name: Joi.string().required().error(new Error("Name is required")),
                email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error("Email is required")),
                
                phone_number: Joi.string().pattern(/^\d{10}$/).required()
                    .messages({
                        'string.pattern.base': 'Phone number must be a 10-digit number',
                        'any.required': 'Phone number is required'
                    }),
                password : Joi.string()
                    .min(8)
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                    .required()
                    .error(new Error("Password is required and must meet the criteria.")),
                address: Joi.string(),
                profile_image: Joi.string(),
            }),

            login: Joi.object({
                email: Joi.string().required().error(new Error("Email is required")),
                password: Joi.string().required().error(new Error("Password is required")),
            }),

            update: Joi.object({
                mentor_name: Joi.string(),
                phone_number: Joi.string().pattern(/^\d{10}$/)
                    .messages({
                        'string.pattern.base': 'Phone number must be a 10-digit number',
                    }),
                address: Joi.string(),
                profile_image: Joi.string(),
            }),
        };
    }

    validateAndNext = (schemaName) => (req, res, next) => {
        const schema = this.schemas[schemaName];
        try {
            const { error } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }
    };

    signup = this.validateAndNext('signup');
    login = this.validateAndNext('login');
    update = this.validateAndNext('update');
}

export default new MentorValidator();
