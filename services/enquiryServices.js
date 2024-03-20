import enquiryModel from "../models/enquiryModel.js";

let createRecordService=async(serielNo,name,mobile,address,education,date,enquiryAbout)=>{
    try {
        let record=new enquiryModel({serielNo,name,mobile,address,education,date,enquiryAbout});
        await record.save();
        return "Success"
    } catch (error) {
        console.log(error);
        return "Error....??"
    }
};






export {createRecordService}