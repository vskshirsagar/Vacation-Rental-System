const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listinSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController =require("../controllers/listings.js");
const multer  = require("multer");
const {storage,  fileFilter} = require("../cloudConfig.js");
const upload = multer({ storage,  fileFilter });

//index route
//router.get("/",wrapAsync(listingController.index));
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
     validateListing,
  wrapAsync(listingController.createForm)
);

//new route
router.get("/new", isLoggedIn,listingController.renderNewform);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateroute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteroute));


//edit route
router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.editroute));



module.exports =router;