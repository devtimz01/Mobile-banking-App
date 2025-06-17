import { Itransaction, ItransactionCreationBody, IfindTransaction } from "../interfaces/transaction-interface";
import transactionModel from "../model/transcaction-schema";

class TransactionDataSource{
    async createTransaction(record:ItransactionCreationBody):Promise<Itransaction>{
        return await transactionModel.create(record);
    }
    async fetch(query:IfindTransaction):Promise<Itransaction | null>{
        return await transactionModel.findOne(query)
    }
     async updateOne(data: Partial<Itransaction>,sortBy: IfindTransaction):Promise<void>{
        await transactionModel.update(data, sortBy);
     }
};

export default TransactionDataSource;