const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_url= "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connection start");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_url);
}

const initDB= async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj) => ({...obj, owner:"6859b3b938fbf0a7f221d9f0"}));
    await Listing.insertMany(initData.data);
    console.log("data was inintialized");
}
initDB();