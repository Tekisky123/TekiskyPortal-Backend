import enquiryModel from "../models/enquiryModel.js";
import { createRecordService } from "../services/enquiryServices.js";


let createRecord=async(req,res)=>{
    console.log(req.body);
    let{serielNo,name, mobile,address,education,date,enquiryAbout}=req.body;

    try {
        
        let status=await createRecordService(serielNo,name,mobile,address,education,date,enquiryAbout)
        if(status=="Success"){
            // if (!mobile|| mobile === null) {
            //     return res.status(400).json({ success: false, message: "Mobile number is required and cannot be null" });
           // res.status(200).json({success:true,message:"record created successfully"})
           res.status(200).send('success')
        }else{
           // res.status(501).json({success:false,message:"Error "})
           res.status(501).send('error')
        }
    } catch (error) {
        console.log(error);
        console.log("Error In Controller...");
    }
}

let updaterecord=async(req,res)=>{
    const _id=req.params.id;
    try {
        let {serielNo,name,mobile,address,education,date,enquiryAbout}=req.body
        const data=await enquiryModel.findByIdAndUpdate({_id},{serielNo,name,mobile,address,education,date,enquiryAbout});
        return res.status(201).json({
            success:true,
            message:"Record Updated Successfully"
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Error Occured During Update Record..",
            error:error.message
        })
    }
};

const getAllRecords=async(req,res)=>{
    try {
        const data=await enquiryModel.find()
        if(!data)return res.status(404).json({
            success:false,
            message:"There Is No Enquiry Details ...!!"
        })
        return res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success:false,
            message:"Error While Displaying Records....!!??//??",
            error:error.message
        })
    }
};

let deleteRecord=async(req,res)=>{
    const _id=req.params.id;
    const data=await enquiryModel.findByIdAndDelete(_id)
    if(!data){
        return res.status(status.BAD_REQUEST).json({
            success:false,
            message:"Invalid Id..."
        })
    }
    res.json({
        success:true,
        message:"User Deleted Successfully."
    })
}

const getOneRecord=async(req,res)=>{
    try {
        const _id=req.params.id
        const enquiry= await enquiryModel.findById(_id)
        if(!enquiry){
            return res.status(404).json({
                success: false,
                message: 'No enquiries Found!',
            });
        }
        return res.status(200).json({
            
            success: true,
            enquiry,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error While Displaying!",
            error: error.message,
            
        });
    }
}


export {createRecord,updaterecord,getAllRecords,deleteRecord,getOneRecord}