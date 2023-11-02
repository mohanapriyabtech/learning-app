import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class MentorValidator {
    constructor() {
        this.schemas = {
            signup: Joi.object({
                mentor_name: Joi.string().required().error(errors => {
                    return new Error('Name is required');
                }),
                email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(errors => {
                    return new Error('Email is required');
                }),
                phone_number: Joi.string()
                .length(10)
                .required()
                .error(errors => {
                    return new Error('Phone number must be a 10-digit number');
                }),
                password : Joi.string()
                    .min(8)
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                    .required()
                    .error(errors => {
                        return new Error('Password is required and must meet the criteria.');
                    }),
                address: Joi.string(),
                profile_image: Joi.string(),
            }),

            update: Joi.object({
                mentor_name: Joi.string(),
                phone_number: Joi.string()
                .length(10)
                .error(errors => {
                    return new Error('Phone number must be a 10-digit number');
                }),
                address: Joi.string(),
                profile_image: Joi.string(),
            }),
        };
    }

    validateAndNext = (schemaName) => (req, res, next) => {
        const schema = this.schemas[schemaName];
        const { error } = schema.validate(req.body);
        if (!error) {
            next();
        } else {
            const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            return responseHandler.errorResponse(res, {}, errorMessage, 400);
        }
    };

    signup = this.validateAndNext('signup');
    update = this.validateAndNext('update');
}

export default new MentorValidator();
