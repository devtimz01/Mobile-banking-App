import jwt from 'jsonwebtoken';
import { Request,Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

const protect=async(req:Request,res:Response)=>{
    let token: string;
    if(req.headers.authorization && req.headers.authorization.startsWith("bearer")){
         try{
              token = req.headers.authorization.split(" ")[1] 
              const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
              req.user =
              next();
         }
         catch(err){
            throw new Error("invalid user token ")
         }
    }  
    else{
        res.status(404).send("token not found")
    }
    //Jwt.verify(token)
    //select(-password)
};

export default {protect}