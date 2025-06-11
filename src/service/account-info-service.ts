import AccountDataSource from "../DataSource/account-datasource"
import { IaccountInfo, IaccountInfoCreationBody, IfindAccounts } from "../interfaces/account-interface"
import { AccountStatus } from "../enums/account-enums";
import crypto from "crypto"
import sequelize from "../Database";

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

   async createAccount(record: Partial<IaccountInfoCreationBody>){
    const accountData={
         ...record,
         balance: 0.00,
         status: AccountStatus.ACTIVE   
         }as IaccountInfoCreationBody
         let account= await this.createAccountNumber(accountData);
         return account;
   };

   async createAccountNumber(record:IaccountInfoCreationBody){
      const accountData={...record}
      //cryptographically generate account number
      const generateAccountNumber=(num:number)=>{
        let digit ='0123454789'
           let accountNumber ='';
                for(let i=0;i<num;i++){
                const randomIndex= crypto.randomBytes(1)[0]%digit.length;
                accountNumber+=digit[randomIndex];}

            return accountNumber;
      }

      let validAccount= false;
          while(!validAccount){
             accountData.accountnumber= generateAccountNumber(9)
             const data = await this.findByField({accountnumber: accountData.accountnumber})
             if(!data){
            validAccount= true
            break;} }
            return await this.dataSource.create(accountData);
   };
   async findAll(userId: string):Promise<IaccountInfo[]>{
      const query={
         where:{userId},
         raw: true
      }
      return await this.dataSource.findAllAccount(query)
   }
   async findById(record: Partial<IaccountInfo>):Promise<IaccountInfo| null>{
      const query={
         where:{...record},
         raw:true
      } as IfindAccounts
     return  await this.dataSource.fetchOne(query)
   };

   async topUpBalance(accountId: string, amount: number, options: Partial<IfindAccounts>={}){
      const filter={
         where:{id:accountId},...options
      }
      const update ={
         balance: sequelize.literal(`balance+${amount}`)
      }
      return await this.dataSource.updateOne(update,filter)
      
   };
   
};

export default AccountService;
