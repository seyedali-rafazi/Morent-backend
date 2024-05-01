const createError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../../../utils/constants");

const addProductSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(createError.BadRequest("Incorrect title")),
  description: Joi.string()
    .required()
    .error(createError.BadRequest("Incorrect description")),
  slug: Joi.string().required().error(createError.BadRequest("Incorrect slug")),
  imageLink: Joi.string()
    .required()
    .error(createError.BadRequest("Incorrect imageLink")),
  carGroup: Joi.string()
    .required()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("Incorrect carGroup")),
  price: Joi.number()
    .required()
    .error(createError.BadRequest("Incorrect price")),
  discount: Joi.number()
    .allow(0)
    .error(createError.BadRequest("Incorrect discount")),
  offPrice: Joi.number()
    .allow(0)
    .error(createError.BadRequest("Incorrect offPrice")),
    typecars: Joi.string()
    .required()
    .error(createError.BadRequest("Incorrect typecar")),
  capacity: Joi.number()
    .required()
    .error(createError.BadRequest("Incorrect capacity")),
  steering: Joi.string()
    .required()
    .error(createError.BadRequest("Incorrect steering")),
  gasoline: Joi.number()
    .required()
    .error(createError.BadRequest("Incorrect gasoline")),
});

const changeCourseDiscountSchema = Joi.object({
  offPrice: Joi.number()
    .required()
    .error(createError.BadRequest("Incorrect offPrice")),
  discount: Joi.number()
    .required()
    .allow(0)
    .error(createError.BadRequest("Incorrect discount")),
});

module.exports = {
  addProductSchema,
  changeCourseDiscountSchema,
};
