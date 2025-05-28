import TransactionService from "../service/transaction-service";
import { Request,Response } from "express";
import logger from "../utils/index.log";

class Transaction{
    
    constructor(){
        
    }
    async initiateDeposit(req:Request,res:Response){
        try{
            const params= {...req.body}
            const deposit= await TransactionService.paymentUrlLink(params.user.email, params.amount)
            return res.status(201).send("deposit successfully initiated")
        }catch(err){
            logger.error(err)
            return res.status(500).send('deposit not initated, server error')
        }      
    }
};

export default Transaction;
