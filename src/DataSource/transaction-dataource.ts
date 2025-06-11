import { Itransaction, ItransactionCreationBody, IfindTransaction } from "../interfaces/transaction-interface";
import transactionModel from "../model/transcaction-schema";

class TransactionDataSource{
    async createTransaction(record:ItransactionCreationBody):Promise<Itransaction>{
        return await transactionModel.create(record);
    }
    async fetch(query:IfindTransaction):Promise<Itransaction | null>{
        return await transactionModel.findOne(query)
    }
     
};

export default TransactionDataSource;