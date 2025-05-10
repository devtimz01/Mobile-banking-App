import { Model, Optional } from "sequelize";

export interface IaccountInfo{
    id: string;
    accountnumber:string;
    balance:number;
    createdAt: Date;
    updatedAt: Date
}

 export interface IfindAccounts{
    where:{
        [key:string]:string
    },
    raw?: boolean;
    returning: boolean
}

export interface IaccountInfoCreationBody extends Optional<IaccountInfo, "" | "">{}
export interface IaccountModel extends Model<IaccountInfo, IaccountInfoCreationBody>, IaccountInfo{}
export interface IaccountDataSource{
    fetchOne(query:IfindAccounts):Promise<IaccountInfo | null>
    findAll(query:IfindAccounts):Promise<IaccountInfo | null>
    create(record: IaccountInfoCreationBody):Promise<IaccountInfo>
};
