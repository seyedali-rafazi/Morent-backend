const Joi = require("joi");
const createHttpError = require("http-errors");

const addCarGroupSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("car group title is not correct")),

  type: Joi.string()
    .required()
    .max(100)
    .valid("cargroups", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("car group type is not correct")),
});

const updateCarGroupSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("car group title is not correct")),
  type: Joi.string()
    .required()
    .min(3)
    .max(100)
    .valid("product", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("car group type is not correct")),
});

module.exports = {
  addCarGroupSchema,
  updateCarGroupSchema,
};
