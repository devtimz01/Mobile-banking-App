import { Model, Optional } from "sequelize";

export interface IaccountInfo{
    id: string;
    userId:string;
    accountnumber:string;
    balance:number;
    type: string;
    status:string;
    createdAt: Date;
    updatedAt: Date;
    
}

 export interface IfindAccounts{
    where:{
        [key:string]:string
    },
    raw?: boolean;
    returning: boolean
}

export interface IaccountInfoCreationBody extends Optional<IaccountInfo, "id" | "updatedAt" |"createdAt">{}
export interface IaccountModel extends Model<IaccountInfo, IaccountInfoCreationBody>, IaccountInfo{}
export interface IaccountDataSource{
    fetchOne(query:IfindAccounts):Promise<IaccountInfo | null>
    create(record: IaccountInfoCreationBody):Promise<IaccountInfo>
};
