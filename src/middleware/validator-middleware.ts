import {Schema} from 'yup';
import { Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const validator=(schema:Schema<any>)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await schema.validate(req.body,{abortEarly:false})
            next() }
        catch(err){
            res.status(500).send("server error");
        }
    }
};

export const protect=async(req:Request,res:Response,next:NextFunction)=>{
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