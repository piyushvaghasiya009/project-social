import Joi from 'joi';

export const createPost = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    active_status: Joi.number().required().default(0),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
});

export const updatePost = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    active_status: Joi.number().required().default(0),
    longitude: Joi.string().required(),
    latitude: Joi.string().required()
});
