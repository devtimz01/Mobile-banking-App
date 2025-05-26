import { DataTypes, json } from 'sequelize'
import Db from '../Database/index'
import { ItransactionModel } from '../interfaces/transaction-interface'
import utility from '../utils/parse-Json';

const transactionModel = Db.define<ItransactionModel>('transactionodel',{
    id:{
        type: DataTypes.UUID,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    userId:{
        type: DataTypes.STRING,
        allowNull:false
    },
    accountId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.DECIMAL(30,2),
        defaultValue:0.0,
        allowNull:false
    },
    details:{
        type:DataTypes.JSON,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }

},{ timestamps: true,
    tableName:'transactions',
    updatedAt:'updatedAt',
    createdAt:'createdAt',
    hooks:{
    //stringify JSON, parse to JSON to store in sequelize;
        beforeCreate:async(transaction,options)=>{
            if(transaction.details && typeof transaction.details=="object"){
                transaction.details= JSON.stringify(transaction.details) as any;
            }
        },
        beforeUpdate:async(transaction,options)=>{
            if(transaction.details && typeof transaction.details=="object"){
                transaction.details= JSON.stringify(transaction.details) as any;
            }
        },
        afterCreate:async(transaction:any,options)=>{
            if(transaction.details && typeof transaction.details=="string"){
                transaction.details= utility.parseObject(transaction.details) 
            }
        },
        afterFind:async(transaction:any,options)=>{
            if(Array.isArray(transaction)){
                transaction.forEach((tx,index)=>{
                    if(tx.details && typeof tx.details=="string"){
                        tx.details= utility.parseObject(tx.details)
                    }
                })
            }
            else{
               if(transaction.details && typeof transaction.details=="string"){
                transaction.details= utility.parseObject(transaction.details)};
            }
        }
    }
});

export default transactionModel;



