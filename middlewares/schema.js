// const Joi = require('joi');
import Joi from "joi";

const createUserSchema = Joi.object({
   name: Joi.string().min(3).max(30).required(),
   email: Joi.string().email().required(),
   // age: Joi.number().integer().min(18).required(),
});

const validateRequest = (schema) => (req, res, next) => {
   const { error } = schema.validate(req.body, { abortEarly: false });
   // console.log(error.details)
   if (error) {
      let messages = [];
      for (let i = 0; i < error?.details?.length; i++) {
         messages.push(error.details[i].message);
      }

      return res.status(400).json({ errorMessages: messages });
   }
   next(); // If validation passes, proceed to the next middleware/controller
};

// module.exports = { createUserSchema, validateRequest };
export { createUserSchema, validateRequest };