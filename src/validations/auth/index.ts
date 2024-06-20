import Joi from "joi";

export const LoginValidation = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email")
        .messages({
            "string.empty": "{{#label}} is required"
        }),
    password: Joi
        .string()
        .min(8)
        .required()
        .label("Password")
        .messages({
            "string.empty": "{{#label}} is required"
        }),
});

export const forgetPasswordValidation = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email")
        .messages({
            "string.empty": "{{#label}} is required"
        })
});

export const ResetPasswordValidation = Joi.object({
    password: Joi
        .string()
        .min(8)
        .required()
        .label("Password")
        .messages({
            "string.empty": "{{#label}} is required"
        }),
    confirmPassword: Joi
        .string()
        .min(8)
        .valid(Joi.ref("password")).messages({ "any.only": "{{#label}} does not match" })
        .required()
        .label("Confirm Password")
        .messages({
            "string.empty": "{{#label}} is required"
        }),
});