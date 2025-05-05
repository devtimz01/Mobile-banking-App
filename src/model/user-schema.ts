import { IuserModel } from "../interfaces/user-interface";
import Db from "../Database/index";
import { DataTypes} from "sequelize";

const UserModel = Db.define<IuserModel>('UserModel',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true    
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue:'guest_user'

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
    firstname:{
        type: DataTypes.STRING,
        allowNull: false

    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer'
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
        defaultValue: false
    },
    accountStatus:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'guest_user'
    }
    
},{timestamps:true,
   tableName :'users',
   createdAt: 'createdAt',
   updatedAt : 'updatedAt'
}
);

export default UserModel;
