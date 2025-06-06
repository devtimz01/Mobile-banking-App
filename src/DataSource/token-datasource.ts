import { IinsertTypes, Itoken, ItokenCreationBody, ItokenDataSource } from "../interfaces/token-interarface";
import tokenModel from "../model/token-schema";

class TokenDataSource implements ItokenDataSource{
    async fetchOne(query: IinsertTypes): Promise<Itoken | null> {
        return await tokenModel.findOne(query)
    }

    async create(record: ItokenCreationBody): Promise<Itoken> {
        return await tokenModel.create(record)     
    }

   async updateOne(sortBy: IinsertTypes, data: Partial<Itoken>): Promise<void> {
       await tokenModel.update(data,sortBy);
   }
}
export default TokenDataSource;
