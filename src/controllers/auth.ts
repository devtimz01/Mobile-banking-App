import UserService from "../service/service";
import express,{Request, Response} from 'express';
import { IuserCreationBody } from "../interfaces/user-interface";
import bcrypt from "bcrypt";

class Authentication{
    private userService: UserService
    constructor(_userService: UserService){
        this.userService=_userService
    }
    async register(req:Request,res:Response){
        const{username,email,password,firstname,lastname,isEmailVerified,role,accountStatus}: IuserCreationBody= req.body;
        try{
            const existingUser = await this.userService.findByField({email});
            if(existingUser){
                return res.status(409).send('user already exists')
                //or use helper functions for route validation...
            }          
                //create user
                const saltRounds  = 10
                const hashedPassword  = await bcrypt.hash(password,saltRounds)
                const user = await this.userService.createUser({
                    username,
                    email,
                    password:hashedPassword,
                    firstname,
                    lastname,
                    isEmailVerified,
                    role,
                    accountStatus
                });
                return res.status(201).json({user})          
        }
        catch(err){
            console.log(err)
            return res.status(500).send('server error')
        }
    }
 };

export default Authentication;
