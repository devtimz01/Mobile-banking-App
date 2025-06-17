import { FindOptions } from "sequelize";
import { IaccountDataSource, IaccountInfo, IaccountInfoCreationBody, IfindAccounts } from "../interfaces/account-interface";
import accountModel from "../model/account-schema";

class AccountDataSource implements IaccountDataSource{
    async create(record:IaccountInfoCreationBody):Promise<IaccountInfo>{
        return await accountModel.create(record)
    }

    async fetchOne(query: IfindAccounts): Promise<IaccountInfo | null> {
        return await accountModel.findOne(query)
    }
    async findAllAccount(filter: FindOptions<IaccountInfo>): Promise<IaccountInfo[]> {
       return await accountModel.findAll(filter)
    }
   async updateOne(data: Partial<IaccountInfo>,sortBy: IfindAccounts): Promise<void> {
       await accountModel.update(data, sortBy)
   }
};

export default AccountDataSource;
