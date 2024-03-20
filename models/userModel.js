import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     userName:{type:String,required:true,trim:true},
     mobileNumber:{type:String,min:10,required:true, unique:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     userType:{type:String,required:true}
});

const userModel=mongoose.model('user',userSchema)

export default userModel