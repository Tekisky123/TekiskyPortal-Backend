import mongoose from "mongoose";

const enquirySchema=new mongoose.Schema({
    serielNo:{type:String},
    name:{type:String,trim:true},
    mobile:{type:String},
    address:{type:String},
    education:{type:String},
    date:{type:String},
    enquiryAbout:{type:String}
    
});

const enquiryModel=mongoose.model('enquiry',enquirySchema)

export default enquiryModel