import {Schema} from 'yup';
import { Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/index.log';
import { userService } from '../routes/authRoute';
import { Iuser } from '../interfaces/user-interface';
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
              const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Iuser
              req.body.user = await userService.findByField({id:decoded.id})
              next();
         }
         catch(err){
            
            return res.status(500).send("error authenticating user")
         }
    }  
    else{
        res.status(404).send("token not found")
    }
    //Jwt.verify(token)
    //select(-password)
};