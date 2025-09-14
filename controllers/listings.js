const Listing=require("../models/listing.js")

module.exports.index = async (req, res) => {
    const { country } = req.query;
    let allListing;

    if (country && country.trim() !== "") {
        // Case-insensitive match using RegExp
        const regex = new RegExp(country, "i");
        allListing = await Listing.find({ country: { $regex: regex } });
    } else {
        allListing = await Listing.find({});
    }

    res.render("listing/index.ejs", { allListing, country });
};

// module.exports.index=async(req,res)=>{
//     const allListing=await Listing.find({});
//     res.render("listing/index.ejs", {allListing});
//     }

module.exports.renderNewform=(req,res)=>{
    res.render("listing/new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
     path :"author"
    },
    })
    .populate("owner");
    if(!listing){
     req.flash("error","Listing you requested for does not exist!");
    return  res.redirect("/listing");
    }
    console.log(listing);
    res.render("listing/show.ejs",{listing});
};

module.exports.createForm = async(req, res, next) => {

   let url = req.file.path;
   let filename = req.file.filename;
  
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user._id;
    newListing.image={url, filename};
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listing");
  };

  module.exports.editroute=async(req,res)=>{
     let {id}=req.params;
      const listing=await Listing.findById(id);
      if(!listing){
       req.flash("error","Listing you requested for does not exist!");
      return  res.redirect("/listing");
      }
      let OrignalImgUrl= listing.image.url;
      OrignalImgUrl = OrignalImgUrl.replace("/upload","/upload/w_250");
      res.render("listing/edit.ejs",{listing, OrignalImgUrl});

  }

  module.exports.updateroute=async(req,res)=>{
    let {id}=req.params;
    // let listing= await Listing.findById(id);
   let listing= await  Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!== "undefined"){
    let url = req.file.path;
   let filename = req.file.filename;
   listing.image={url, filename};
   await listing.save();
   }
   req.flash("success","Listing Updated");
   res.redirect(`/listing/${id}`);
};

module.exports.deleteroute=async(req,res)=>{
    let {id}=req.params;
  let deletedListing= await  Listing.findByIdAndDelete(id);
console.log(deletedListing);
   req.flash("success","Listing Deleted");
res.redirect("/listing");
};
