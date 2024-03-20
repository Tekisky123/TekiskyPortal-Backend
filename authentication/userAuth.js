import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

let verifyToken=(token)=>{
    let secretKEY=process.env.SECRETKEY
    try {
        let data=jwt.verify(token,secretKEY);
        return data.email
    } catch (error) {
        return "invalid token"
    }
};

let getToken=(email)=>{
    let secretKEY=process.env.SECRETKEY;
    console.log(secretKEY,'huhwuihw')
    let token=jwt.sign({email:email},secretKEY,{expiresIn:"120h"})
    return token;
};

let passwordHash=async(userPassword)=>{
    try {
        let hashPass=await bcrypt.hash(userPassword,10);
        return hashPass;
    } catch (error) {
        console.log('error while hashing password');
    }
};

let checkPassword=async(plainPassword,dbPass)=>{
    try {
        let status=await bcrypt.compare(plainPassword,dbPass);
        return status;
    } catch (error) {
        console.log(error)
    }
}; 

export {passwordHash,checkPassword,getToken,verifyToken}