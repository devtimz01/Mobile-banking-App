import { IfindTypes, Iuser ,IuserCreationBody } from "../interfaces/user-interface";
import DataSource from "../DataSource/datasource";
import { raw } from "express";

class UserService {
    private dataSource: DataSource;
    constructor(_dataSource: DataSource){
        this.dataSource= _dataSource
    }

    async findByField(record:Partial<Iuser>):Promise<Iuser|null>{
       const query= {
        where:{...record},
        raw: true} as IfindTypes;
        return this.dataSource.fetchOne(query);
    };

    async createUser(record:IuserCreationBody):Promise<Iuser>{
        return this.dataSource.create(record)
    }
    async updateOne(data:Partial<Iuser>, record:Partial<Iuser>):Promise<void>{
        const query={where:{
            ...record
        },
        raw: true 
    } as IfindTypes
       this.dataSource.updateOne(data,query)
    }
};

export default UserService;
