import { where } from "sequelize";
import TransactionDataSource from "../DataSource/transaction-dataource";
import { PaymentGateway } from "../enums/payment-enums";
import { TransactionStatus, TransactionType } from "../enums/transaction-enums";
import { IfindTransaction, IpaymentObject, Itransaction, ItransactionCreationBody } from "../interfaces/transaction-interface";

class TransactionService{
    transactionDataSource: TransactionDataSource
    constructor(_transactionDataSource: TransactionDataSource){
        this.transactionDataSource= _transactionDataSource;
    }
    async depositTransaction(Data: Partial<Itransaction>):Promise<Itransaction>{
         const deposit={
            ...Data,
            type:TransactionType.DEPOSIT,
            status: TransactionStatus.PENDING,
            details:{
                ...Data.details,
                gateway:PaymentGateway.PAYSTACK,
            }
         } as Itransaction
         return await this.transactionDataSource.createTransaction(deposit);
    } 
    async fetchTransactionByRef(reference: string):Promise<Itransaction|null>{
        const query={
            where:{reference},
            raw: true
        }
        return await this.transactionDataSource.fetch(query)

    }
    async setStatus(){
        
    }

    async fetchTransaction(){}
};

export default TransactionService