const _ = require("lodash");
const Joi = require("joi");

const schema = Joi.object({
  categoryId: Joi.number().integer().required(),
  title: Joi.string().required(),
  content: Joi.string().max(15000).required(),
  img_url: Joi.string().required(),
});

module.exports = async (data) => {
  if (_.isEmpty(data)) {
    throw new Error("Bad Request, missing input");
  }
  try {
    await schema.validateAsync(data);
  } catch (error) {
    throw new Error("Bad Request, invalid or missing input");
  }
};
