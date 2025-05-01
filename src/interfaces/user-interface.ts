import {Optional,Model} from 'sequelize';

export interface Iuser{
    id: string,
    username: string
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isEmailVerified: boolean,
    role: string,
    accountStatus: string,
    createdAt: string,
    updatedAt: string
}

export interface IuserCreationBody extends Optional<Iuser,"id"|"createdAt"|"updatedAt">{}
export interface IuserModel extends Model<Iuser,IuserCreationBody>,Iuser{}


