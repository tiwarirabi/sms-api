import * as Joi from 'joi';

export const SignInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const SignUpSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  middleName: Joi.string()
    .optional()
    .allow(null),
  lastName: Joi.string().required(),
  mobile: Joi.string().required(),
  gender: Joi.string()
    .required()
    .valid('male', 'female', 'other')
});

export const NewTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});
