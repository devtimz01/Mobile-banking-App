import { IaccountInfoCreationBody } from "../interfaces/account-interface";
import AccountService from "../service/account-info-service";
import { Request,Response } from "express";
import UserService from "../service/service";
import protect from "../middleware/protect.";

class Account{
    private accountService:AccountService
    private userM0del: UserService
    constructor(_accountservice:AccountService,_userModel:UserService){
        this.accountService= _accountservice;
        this.userM0del= _userModel;
    };
    
    async createAccountNumber(req:Request,res:Response){
        const{status} : IaccountInfoCreationBody= req.body
        try{
            const user = await this.userM0del.findByField({id: req.body.id}) //id gotten from bearer token
             if(!user){
            return res.status(404).send("user not found"); }

            const accountInf0 = await this.accountService.createAccount({id: req.body.id },{status: req.body.status})
             return res.status(201).json({accountInf0})
        }
        catch(err){
            return res.status(201).send("server error")
        }
    }

}
export default Account