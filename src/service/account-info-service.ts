import AccountDataSource from "../DataSource/account-datasource"
import { IaccountInfo, IaccountInfoCreationBody, IfindAccounts } from "../interfaces/account-interface"
import crypto from "crypto"

class AccountService{
   dataSource: AccountDataSource
   constructor(_dataSource: AccountDataSource){
    this.dataSource= _dataSource
   }

   async findByField(record:Partial<IaccountInfo>): Promise<IaccountInfo|null>{
      const query={
        where:{
            ...record
        },
        raw: true
      } as IfindAccounts
     return await this.dataSource.fetchOne(query)
   }

   async createAccount(record: IaccountInfoCreationBody): Promise<IaccountInfo>{
    const accountData={

         } as IaccountInfoCreationBody
         let account= await this.createAccountNumber(accountData);
         return account;
   };

   async createAccountNumber(record:IaccountInfo){
      const accountData={...record}
      //cryptographically generate account number
      const generateAccountNumber=(num:number)=>{
        let digit ='0123454789'
           let accountNumber =''
           for(let i=0;i<10;i++){
            const randomIndex= crypto.randomBytes(1)[0]%digit.length;
            accountNumber+=digit[randomIndex];}

            return accountNumber;
      }
      
      accountData.accountnumber= generateAccountNumber(9)
      let validAccount= false;
          while(!validAccount){
             const data = await this.findByField({accountnumber: accountData.accountnumber})
             if(!data){
            validAccount= true
            break;} }

            return await this.dataSource.create(accountData);
   };
}

export default AccountService;
