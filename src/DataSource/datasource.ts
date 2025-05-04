import UserModel from "../model/user-schema";
import { IdataSource, IfindTypes, Iuser, IuserCreationBody } from "../interfaces/user-interface";

class DataSource implements IdataSource {
    async fetchOne(query: IfindTypes): Promise<Iuser | null> {
        return await UserModel.findOne();
    }
    async create(record: IuserCreationBody): Promise<Iuser> {
        return await UserModel.create(record)
    }
}

export default DataSource;

