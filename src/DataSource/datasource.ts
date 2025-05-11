import UserModel from "../model/user-schema";
import { IdataSource, IfindTypes, Iuser, IuserCreationBody } from "../interfaces/user-interface";

class DataSource implements IdataSource {
    async fetchOne(query: IfindTypes): Promise<Iuser | null> {
        return await UserModel.findOne(query);
    }
    async create(record: IuserCreationBody): Promise<Iuser> {
        return await UserModel.create(record)
    }
    async updateOne(sortBy: IfindTypes, data: Partial<Iuser>): Promise<void> {
           await UserModel.update(data,sortBy);
    }
}

export default DataSource;

