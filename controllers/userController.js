import userModel from "../models/userModel.js";
import HttpStatus from 'http-status-codes';  //need to import the status object from a library like http-status-codes or define it yourself
import { registerUserService ,getUserService} from "../services/userService.js";
import { getToken,checkPassword,verifyToken ,passwordHash } from "../authentication/userAuth.js";

let createUser=async(req,res)=>{
    let{userName,mobileNumber,email,password,userType}=req.body;  
    try {
    let hashpassword=await passwordHash(password)
    
       let status=await registerUserService(userName,mobileNumber,email,hashpassword,userType) 
       if (status=='success'){
        let token=await getToken(email)
        res.status(200).send('success')
       }else{
        res.status(501).send('error')
       }
    } catch (error) {
        console.log(error)
        console.log('Error In Controller');
    }
}

let login=async(req,res)=>{
    let {mobileNumber,password}=req.body;
    try {
        let user=await getUserService(mobileNumber)
       let status=await checkPassword(password,user.password)
        if(status){
         let token=getToken(mobileNumber)
         console.log(token,"sana")
            res.status(200).send({status:"success",token:token,data:user});
        }else{
            res.status(401).send("Invalid Login??");
        }
    } catch (error) {
        console.log(error);
    }
};

let updateUsers=async(req,res)=>{
    const _id=req.params.id;
   try {
    let {userName,mobileNumber,email,password,userType}=req.body;
    const data=await userModel.findOneAndUpdate({_id},{userName,mobileNumber,email,password,userType})

    return res.status(201).json({
        success:true,
        message:"User Record Updated Successfully....!"
    })
   } catch (error) {
      return res.status(404).json({
        success:false,
        message:"Error Occured During Update User?!",
        error:error.message
      })
   }
};

let getUser=async(req,res)=>{
    try {
        const data=await userModel.find()

        if(!data) return res.status(404).json({
            success:false,
            message:"There Is No Users....!"
        })
        return res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        return res.status(status.BAD_REQUEST).json({
            success:false,
            message:"Error While Displaying Users?!",
            error:error.message
        })
    }
};


let deleteUser=async(req,res)=>{
    const _id=req.params.id;
    const data=await userModel.findByIdAndDelete(_id)
    if(!data){
        return res.status(HttpStatus.NOT_FOUND).json({
            success:false,
            message:"Invalid Id..."
        })
    }
    res.json({
        success:true,
        message:"User Deleted Successfully...!"
    })
}

const getOneUser=async(req,res)=>{
  try {
    const _id=req.params.id
    const user=await userModel.findById(_id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'No user Found!',
        });
    }
    return res.status(200).json({
            
        success: true,
        user,
    });
  } catch (error) {
    return res.status(400).json({
        success: false,
        message: "Error While Displaying user!",
        error: error.message,
    });
  }
}

export {createUser,login,updateUsers,getUser,deleteUser,getOneUser}