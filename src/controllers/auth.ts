import UserService from "../service/service";
import express,{Request, Response} from 'express';
import { Iuser, IuserCreationBody } from "../interfaces/user-interface";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

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
                console.log("Existing user lookup result:", existingUser);
                return res.status(401).send('user already exists')
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
                //jwt auth logic
                const token = jwt.sign({
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    role: user.role
                } as Iuser,
                process.env.JWT_SECRET as string,
                {expiresIn:'30d'})
                return res.status(201).json({user,token})          
        }
        catch(err){
            console.log(err)
            return res.status(500).send('server error')
        }
    }
 };

export default Authentication;
