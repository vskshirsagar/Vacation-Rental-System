const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listinSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const viewController = require("../controllers/reviews.js");

router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(viewController.createReview));

//delete review routes
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(viewController.deleteReview));

module.exports=router;