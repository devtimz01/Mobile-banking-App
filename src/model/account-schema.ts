import { DataTypes } from 'sequelize';
import Db from '../Database/index'
import { IaccountModel } from '../interfaces/account-interface'

const accountModel = Db.define<IaccountModel>('accountModel',{
    id:{
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId:{
        type:DataTypes.STRING,
        allowNull: false   
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull: false
    },
    accountnumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    balance:{
        type:DataTypes.DECIMAL(30,2),
        allowNull:false,
        defaultValue: 0.00
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt:{
         type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    timestamps: true,
    tableName: 'accountInfo',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export default accountModel;