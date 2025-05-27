import { Itransaction, ItransactionCreationBody } from "../interfaces/transaction-interface";
import transactionModel from "../model/transcaction-schema";

class TransactionDataSource{
    async createTransaction(record:ItransactionCreationBody):Promise<Itransaction>{
        return await transactionModel.create(record);
    }
};

export default TransactionDataSource;