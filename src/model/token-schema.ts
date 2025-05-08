import { DataTypes } from "sequelize";
import Db from "../Database/index"
import { ItokenModel } from "../interfaces/token-interarface"

const tokenModel = Db.define<ItokenModel>('tokenModel',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    key:{
        type: DataTypes.STRING,
        allowNull: true
    
    },
    code:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    expires:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
},
{
    timestamps: true,
    tableName:"userToken",
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})

export default tokenModel;