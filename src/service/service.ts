import { IfindTypes, Iuser ,IuserCreationBody } from "../interfaces/user-interface";
import DataSource from "../DataSource/datasource";

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
    async updateOne(searchBy:Partial<Iuser>, record:Partial<Iuser>):Promise<void>{
        const query={where:{
            ...searchBy
        },
        raw: true
    } as IfindTypes
      await this.dataSource.updateOne(query,record)
    }
};

export default UserService;
