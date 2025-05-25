import TransactionService from "../service/transaction-service";
import { Request,Response } from "express";

class Transaction{
    transactionService: TransactionService
    constructor(_transactionDto:TransactionService){
        this.transactionService =_transactionDto;
    }

    async initializeDeposit(req:Request,res:Response){
        
    }
};

export default Transaction;