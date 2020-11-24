const _ = require("lodash");
const Joi = require("joi");

const schema = Joi.object({
  categoryId: Joi.number().integer(),
  title: Joi.string(),
  content: Joi.string().max(15000),
  img_url: Joi.string(),
});

module.exports = async (data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    throw new Error("Bad Request, invalid or missing input");
  }
};