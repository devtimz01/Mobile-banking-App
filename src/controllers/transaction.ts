import TransactionService from "../service/transaction-service";
import { Request,Response } from "express";
import logger from "../utils/index.log";
import PaymentService from "../service/payment-service";
import { Itransaction } from "../interfaces/transaction-interface";
import sequelize from "../Database";
import AccountService from "../service/account-info-service";
import { TransactionStatus } from "../enums/transaction-enums";
import PayeeService from "../service/payee-service";

class TransactionController{  
    private transactionService: TransactionService 
    private accountService: AccountService
    private payeeservice: PayeeService

    constructor(_transactionService:TransactionService, _accountService: AccountService,_payeeService: PayeeService){
        this.transactionService= _transactionService
        this.accountService =_accountService
        this.payeeservice = _payeeService
    };

    private async deposit(id:string, accountId:string, amount:number){
        //keep track of transactons and reverse failed transaction + topup balance + update transaction status
        const tx =await sequelize.transaction()
        try{
            await this.accountService.topUpBalance(accountId,amount,{transaction:tx})
            await this.transactionService.setStatus(id, TransactionStatus.FINALIZED,{transaction:tx})
            await tx.commit();
        }catch(err){
            logger.error(err)
            await tx.rollback();
        }
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
            return res.status(201).json({deposit, depositInfo});
        }catch(err){
            logger.error(err)
            return res.status(500).send('deposit not initated')
        }      
    };

    async verifyTransaction(req:Request,res:Response){
        //get REFERENCE-LINK to verify transaction is successful
        try{
            const params ={...req.body};
            const transaction = await this.transactionService.fetchTransactionByRef(params.reference)
            if(!transaction){
                //use helper functions to return responses
                return res.status(404).send("referenceId not found")
            };
            if(transaction.status != TransactionStatus.PROCESSING){
                return res.status(422).send("transaction not supported")
            }
            const verifyTransaction = await PaymentService.verifyTransactions(params.reference,params.amount)
            const deposit = await this.deposit(transaction.id, transaction.accountId, transaction.amount)
            return res.status(201).json({verifyTransaction,deposit});
        }catch(err){
            logger.error(err)
            return res.status(500).send("failed to verify transaction")
        }  
    };

    private async transfer(senderAccountId: string,recieverAccountNumber: string, amount:number){
    const tx = await sequelize.transaction();
        try{
            await this.transactionService.createTx(senderAccountId, recieverAccountNumber, amount,{transaction:tx})
            await this.accountService.topUpBalance(recieverAccountNumber,amount,{transaction:tx})
            await this.accountService.topUpBalance(senderAccountId,-amount,{transaction:tx})
            await tx.commit();
        }
        catch(err){
            await tx.rollback();
        }
    };
    
    async internalMoneyTransfer(req:Request,res:Response){
       try{
        const params= {...req.body};
        const senderAccountId = await this.accountService.findByField({id:params.senderId})
            if(!senderAccountId){
            return res.status(404).send("account not found");}

            if(senderAccountId.balance<= 0){
              return res.status(422).send('insufficient fund')}

        const recieverAccountNumber = await this.accountService.findByField({id:params.recieverAccountNumber})
            if(!recieverAccountNumber){
                 return res.status(404).send("account not found");} 
            if(senderAccountId== recieverAccountNumber){
                return res.status(433).send("accont number belongs to you , error initiating transfer")
            }  
            const transfer =await this.transfer(senderAccountId.id, recieverAccountNumber.accountnumber, senderAccountId.balance);
        }
        catch(err){
            return res.status(500).send("transfer failed")
        };
    };

    async bankTransfer(req:Request,res:Response){
        const params ={...req.body}
       try{
         let recipientId=''
         const receiverInfo = await this.payeeservice.findRecipient(params.accountNumber, params.bankCode)
        if(!receiverInfo){
            
        }
        else{
            recipientId= receiverInfo.details.paystackBankCode
        }
       }catch(err){
        return res.status(500).send("bank transfer failed")
       }
    };

    async getBeneficiaries(req:Request,res:Response){
    };
    async loanRequest(req: Request,res: Response){}
    async billPayment(req:Request, res:Response){}
    async fraudCheck(req:Request,res: Response){}

};

export default TransactionController;
