import { IuserModel } from "../interfaces/user-interface";
import Db from "../Database/index";

const UserModel = Db.define<IuserModel>('userModel',{
    id:{
        
    },
    username:{
    }
},
{timestamps:true}
)

export default UserModel;