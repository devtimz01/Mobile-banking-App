import TransactionDataSource from "../DataSource/transaction-dataource";
import { PaymentGateway } from "../enums/payment-enums";
import { TransactionStatus, TransactionType } from "../enums/transaction-enums";
import { IfindTransaction, Itransaction } from "../interfaces/transaction-interface";

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
    async createTx(senderAccountId: string, recieverAccountNumber: string,amount: number, options:Partial<IfindTransaction>={}){
        const transaction={
            type:TransactionType.TRANSFER,
            status: TransactionStatus.FINALIZED,
            details:{
                gateway:PaymentGateway.PAYSTACK,
            }
        } as Itransaction
        return await this.transactionDataSource.createTransaction(transaction);
    }
    async fetchTransactionByRef(reference: string):Promise<Itransaction|null>{
        const query={
            where:{reference},
            raw: true,
            returning: true
        } 
        return await this.transactionDataSource.fetch(query)
    }
    async setStatus(id:string, status: string, options:Partial<IfindTransaction>={}){
        const filter={
            where:{id},...options,
            raw: true
        } 
        const update={ status }
        return await this.transactionDataSource.updateOne(filter as any,update as any)
    };
};

export default TransactionService;