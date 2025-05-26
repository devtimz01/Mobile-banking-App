import Db from './index';
import UserModel from '../model/user-schema';
import tokenModel from '../model/token-schema';
import accountModel from '../model/account-schema';
import transactionModel from '../model/transcaction-schema';

const DbIntitialize=async()=>{
    try{
        tokenModel.sync({alter:false})
        UserModel.sync({alter:false})
        accountModel.sync({alter:false})
        transactionModel.sync({alter:false})
        await Db.authenticate()
    }
    catch(err){
        console.log(err);
    }
}

export default DbIntitialize();