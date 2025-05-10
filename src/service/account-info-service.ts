import AccountDataSource from "../DataSource/account-datasource"
import DataSource from "../DataSource/datasource"
import { IaccountInfo, IaccountInfoCreationBody } from "../interfaces/account-interface"

class AccountService{
   dataSource: AccountDataSource
   constructor(_dataSource: AccountDataSource){
    this.dataSource= _dataSource
   }

   async createAccount(record: IaccountInfoCreationBody): Promise<IaccountInfo>{

   }
   async FindOne(record:Partial<IaccountInfo>):Promise<IaccountInfo|null>{

   }
}
export default AccountService;