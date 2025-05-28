import TransactionDataSource from "../DataSource/transaction-dataource";
import { PaymentGateway } from "../enums/payment-enums";
import { TransactionStatus, TransactionType } from "../enums/transaction-enums";
import { Itransaction, ItransactionCreationBody } from "../interfaces/transaction-interface";

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
};

export default TransactionService