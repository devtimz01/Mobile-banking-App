import Db from '../Database/index'
import { IaccountModel } from '../interfaces/account-interface'

const accountModel = Db.define<IaccountModel>('accountModel',{
    
},
{
    timestamps: true,
    tableName: accountInfo,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export default accountModel;