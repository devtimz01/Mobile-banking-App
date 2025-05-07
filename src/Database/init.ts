import Db from './index';
import UserModel from '../model/user-schema';
import tokenModel from '../model/token-schema';

const DbIntitialize=async()=>{
    try{
        tokenModel.sync({alter:true})
        UserModel.sync({alter:true})
        await Db.authenticate()
    }
    catch(err){
        console.log(err);
    }
}

export default DbIntitialize();