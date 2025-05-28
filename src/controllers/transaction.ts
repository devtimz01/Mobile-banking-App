import TransactionService from "../service/transaction-service";
import { Request,Response } from "express";
import logger from "../utils/index.log";
import PaymentService from "../service/payment-service";
import { Itransaction, ItransactionCreationBody } from "../interfaces/transaction-interface";

class TransactionController{  
    private transactionService: TransactionService 
    constructor(_transactionService:TransactionService){
        this.transactionService= _transactionService
    };
    async initiateDeposit(req:Request,res:Response){
        try{
            const params= {...req.body}
            const depositInfo= await PaymentService.paymentUrlLink(params.user.email, params.amount)
            if(!depositInfo){
                return res.status(500).send("depositURlLink error")
            }
            const newTransaction={
                userId: params.userId,
                accountId: params.accountId,
                amount: params.amount,
                refId: depositInfo.reference,
                details:{}
            } as Itransaction
            const deposit = await this.transactionService.depositTransaction(newTransaction)
            return res.status(201).json({deposit });
        }catch(err){
            logger.error(err)
            return res.status(500).send('deposit not initated, server error')
        }      
    }
};

export default TransactionController;
