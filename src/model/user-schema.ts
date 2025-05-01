import { IuserModel } from "../interfaces/user-interface";
import Db from "../Database/index";
import { DataType, DataTypes, UUIDV4 } from "sequelize";
import { table, timeStamp } from "console";

const UserModel = Db.define<IuserModel>('UserModel',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue:()=> UUIDV4,
        primaryKey: true    
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false

    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
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
    },
    isEmailVerified:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    accountStatus:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{timestamps:true,
   tableName :'users',
   createdAt: 'createdAt',
   updatedAt : 'updatedAt'
}
);

export default UserModel;
