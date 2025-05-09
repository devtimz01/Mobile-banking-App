import {Optional,Model} from 'sequelize';

export interface Iuser{
    id: string,
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    isEmailVerified: boolean,
    role: string,
    accountStatus: string,
    createdAt: string,
    updatedAt: string
}
export interface IfindTypes{
    where:{
        [key: string]: string
    };
    raw?: boolean;
    returning: boolean;
}

export interface IuserCreationBody extends Optional<Iuser,"id"|"createdAt"|"updatedAt">{}
export interface IuserModel extends Model<Iuser,IuserCreationBody>,Iuser{}
export interface IdataSource{
    //name methods
    fetchOne(query:IfindTypes): Promise<Iuser|null>;
    create(record:IuserCreationBody): Promise<Iuser>;
    updateOne(data:Partial<Iuser>, query:IfindTypes):Promise<void>;
}
