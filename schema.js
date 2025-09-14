// const Joi = require('joi');

// module.exports.listingSchema = Joi.objext([
//     listing : Joi.object({
//         title: Joi.string().required(),
//         Description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.string().allow("".null)
//     }).required()
// ]); 
// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     image: Joi.string().allow("").allow(null)
//   }).required()
// });
const Joi = require("joi");

module.exports.listinSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0),
  //image: Joi.string().allow("").allow(null)
  image: Joi.object({
      url: Joi.string().uri().allow("").optional()
    }).optional(),
     category: Joi.string()

});

module.exports.reviewSchema =Joi.object({
  rating:Joi.number().required().min(1).max(5),
  comment:Joi.string().required()
});