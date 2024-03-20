import userModel from "../models/userModel.js";

let registerUserService=async(userName,mobileNumber,email,password,userType)=>{
    try {
        let user=new userModel({userName,mobileNumber,email,password,userType});
        await user.save();
        return "success"
    } catch (error) {
        console.log(error);
        return "error"
    }
};
let getDbPassword=async(mobileNumber)=>{
    try {
        let user=await userModel.findOne({mobileNumber});
        let dbPass=user.password;
        return dbPass;
    } catch (error) {
        console.log(error);
    }
};

let getUserService=async(mobileNumber)=>{
    try {
        let user=await userModel.findOne({mobileNumber});
        return user;
    } catch (error) {
        console.log(error);
    }
};

export {registerUserService,getUserService,getDbPassword}