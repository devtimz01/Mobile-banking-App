import Db from './index';
import UserModel from '../model/user-schema';

const DbIntitialize=async()=>{
    try{
        UserModel.sync({alter:false})
        await Db.authenticate()
    }
    catch(err){
        console.log(err);
    }
}

export default DbIntitialize();