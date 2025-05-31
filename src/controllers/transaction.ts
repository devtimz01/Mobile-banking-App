import TransactionService from "../service/transaction-service";
import { Request,Response } from "express";
import logger from "../utils/index.log";
import PaymentService from "../service/payment-service";
import { Itransaction } from "../interfaces/transaction-interface";

class TransactionController{  
    private transactionService: TransactionService 
    constructor(_transactionService:TransactionService){
        this.transactionService= _transactionService
    };
     async initiateDeposit(req:Request,res:Response){
        try{
            const params= {...req.body}
            const depositInfo= await PaymentService.paymentUrlLink(req.user.email, params.amount)
             if(!depositInfo){
                return res.status(500).send("depositURlLink error")}   
            const newTransaction={
                userId: req.user.id,
                accountId: params.accountId,
                amount: params.amount,
                refId: depositInfo.reference,
                details:{}
            } as Itransaction
            const deposit = await this.transactionService.depositTransaction(newTransaction)
            return res.status(201).json({deposit });
        }catch(err){
            //logger.error(err)
            console.log(err)
            return res.status(500).send('deposit not initated')
        }      
    };

    async verifyTransaction(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful

    };

    async internMoneyTransfer(req:Request,res:Response){
       
    };
    async bankTransfer(req:Request,res:Response){
        
    };

    async getBeneficiaries(req:Request,res:Response){
        
    };
};

export default TransactionController;
