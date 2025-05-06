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
                }) as IuserCreationBody;
                //jwt auth logic
                const token = jwt.sign({
                    username: user.username as string,
                    email: user.email as string,
                    id: user.id as string,
                    role: user.role as string
                },
                process.env.JWT_SECRET as string,
                {expiresIn:'30d'})
                return res.status(201).json({user,token})          
        }
        catch(err){
            console.log(err)
            return res.status(500).send('server error')
        }
    };
    async login(req:Request, res:Response){
         try{
            const{email,password}:IuserCreationBody = req.body;
            const user = await this.userService.findByField({email})
            if(!user){
                return res.send(404).send('user does not exist')
            }
            const isPasswordMatch = await bcrypt.compare(password,user.password)
            if(!isPasswordMatch){
                return res.status(401).send('invalid credentials')
            }
            else{
                 //jwt auth logic
                 const token = jwt.sign({
                    username: user.username as string,
                    email: user.email as string,
                    id: user.id as string,
                    role: user.role as string
                },
                process.env.JWT_SECRET as string,
                {expiresIn:'30d'})
                return res.status(200).json({user,token})       
            }          
         }
         catch(err){
            return res.status(500).send('server error')
         }
    };

    async forgetPassword(req:Request,res: Response){
        
    }

    async resetPassword(req:Request,res:Response){

    }
 };

export default Authentication;
