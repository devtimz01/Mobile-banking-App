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
   /* async initiateDeposit(req:Request,res:Response){
        try{
            const params= {...req.body}
            const depositInfo= await PaymentService.paymentUrlLink(params.user.email, params.amount)
             if(!depositInfo){
                return res.status(500).send("depositURlLink error")}   
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
            //logger.error(err)
            console.log(err)
            return res.status(500).send('deposit not initated')
        }      
    };*/

    async initiateDeposit(req: Request, res: Response) {
  try {
    const { amount, userId, accountId } = req.body;
    const user = req.user; // <- pulled from Auth middleware

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const depositInfo = await PaymentService.paymentUrlLink(user.email, amount);
    if (!depositInfo) {
      return res.status(500).send("depositURlLink error");
    }

    const newTransaction = {
      userId,
      accountId,
      amount,
      refId: depositInfo.reference,
      details: {}
    } as Itransaction;

    const deposit = await this.transactionService.depositTransaction(newTransaction);
    return res.status(201).json({ deposit });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Deposit not initiated");
  }
}

    async verifyTransaction(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful

    };

    async internMoneyTransfer(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful
    };
    async bankTransfer(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful
    };

    async getBeneficiaries(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful

    };
};

export default TransactionController;
