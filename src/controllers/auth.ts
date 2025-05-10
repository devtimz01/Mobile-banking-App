import UserService from "../service/service";
import {Request, Response} from 'express';
import {  IuserCreationBody } from "../interfaces/user-interface";
import EmailService from "../service/email-service";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Itoken } from "../interfaces/token-interarface";
import TokenService from "../service/tokenService";
import moment from "moment";
dotenv.config();

class Authentication{
    private userService: UserService
    private tokenService: TokenService

    constructor(_userService: UserService,_tokenService:TokenService){
        this.userService=_userService
        this.tokenService =_tokenService
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

    async forgotPassword(req:Request,res: Response){
        try{
            const{email}: IuserCreationBody= req.body
            //send a forgotpassword token
            const user = await this.userService.findByField({email})
            if(!user){
                return res.status(404).send('user not found')       
            }
                const token = await this.tokenService.sendForgotPasswordToken(email) as Itoken;
                await EmailService.sendMail(email, token.code)
                return res.status(201).send('password reset mail sent')
            
        }
        catch(err){
            return res.status(500).send('password rest mail not sent')
        }
    }

    async resetPassword(req:Request,res:Response){
        try{       
            const params ={...req.body}
            const isVerifiedToken = await this.tokenService.findTokenByField({
                key:params.email,code:params.code,status:this.tokenService.tokenStatus.NOT_USED,type: this.tokenService.tokenType.FORGOT_PASSWORD})
            if(!isVerifiedToken){
                return res.status(404).send('token not found')
            }
            if(isVerifiedToken && moment(isVerifiedToken.expires).diff(moment(),'minute')<=0){
                return res.status(400).send('token expired')
            }

            let user = await this.userService.findByField(params.email)
            if(!user){
                return res.status(404).send('user not found')
            }
                //update unexpired token data and queries
              const saltRounds = 10
              let hashedPassword = await bcrypt.hash(params.password,saltRounds)
              const updatedPasswordRecord= await this.userService.updateOne({id: user.id},{password:hashedPassword})
              const updatedTokenRecord= await this.tokenService.updateOne({id: isVerifiedToken.id},{status:this.tokenService.tokenStatus.USED})
              return res.status(201).json({
                updatedPasswordRecord,updatedTokenRecord
              });     
        }
        catch(err){
            console.log(err)
            return res.status(500).send('server error');
        }
    }
 };

export default Authentication;

