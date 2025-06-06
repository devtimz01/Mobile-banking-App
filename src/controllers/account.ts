import { IaccountInfoCreationBody,IaccountInfo } from "../interfaces/account-interface";
import AccountService from "../service/account-info-service";
import { Request,Response } from "express";
import logger from "../utils/index.log";

class Account{
    private accountService:AccountService
    constructor(_accountservice:AccountService){
        this.accountService= _accountservice;
    };
    
    async createAccountNumber(req:Request,res:Response){
        try{
           const params= {...req.body};
           const newAccount= {
            userId: params.user.id,
            type: params.type
           } as IaccountInfoCreationBody
           let account = await this.accountService.createAccount(newAccount);
           return res.status(201).json({account});

        }
        catch(err){
            logger.error(err);
            return res.status(201).send("server error")
        }
    }

    async findAccount(req:Request,res:Response){
        try{
            const params ={...req.params}
            const account = await this.accountService.findById({id:params.id}) 
            if(!account){
                throw new Error('invalid id')
            }
            return res.status(200).json({
                account
            })
        }catch(err){
            logger.error(err)
            return res.status(500).send("server error")
        }
    }

     async findAllAccount(req:Request,res:Response){
        try{
           // const user= req.user.id
            const allAccount = await this.accountService.findAll(req.user.id)
            if(!allAccount){
                return res.status(404).send("user account not found")
            }
            return res.status(200).json({allAccount});
        }catch(err){
            //logger.error(err)
            return res.status(500).send("server error")
        }  
    }
};

export default Account;





