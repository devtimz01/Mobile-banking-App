import { Model, Optional } from "sequelize";

export interface Itoken{
    key: string;
    id: string;
    type: string;
    code: string;
    expires: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date
}

export interface IinsertTypes{
    where:{
        [key:string]: string
    };
    raw?: boolean;
    returning: boolean
}

export interface ItokenCreationBody extends Optional<Itoken,"id"|"createdAt"|"updatedAt">{}
export interface ItokenModel extends Model<Itoken,ItokenCreationBody>,Itoken{}
export interface ItokenDataSource{ 
    fetchOne(query:IinsertTypes):Promise<Itoken| null>
    create(record:ItokenCreationBody):Promise<Itoken>
    updateOne(data:Partial<Itoken>, query:IinsertTypes): Promise<void>}

