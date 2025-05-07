import { Itoken, ItokenCreationBody } from "../interfaces/token-interarface";
import DataSource from "../DataSource/datasource";
import { generateKey } from "crypto";
import { IinsertTypes } from "../interfaces/token-interarface";
import TokenDataSource from "../DataSource/token-datasource";

class TokenService{
    private dataSource: TokenDataSource
    constructor(_dataSource: TokenDataSource){
        this.dataSource= _dataSource;
    }
    async findTokenByField(record:Partial<Itoken>): Promise<Itoken|null>{
        const query={where:{...record},raw:true} as IinsertTypes
        await this.dataSource.fetchOne(query)
    }

    async sendForgotPasswordToken(){

        
    }

    async createtoken(record: ItokenCreationBody): Promise<Itoken>{
        const data = {...record}
        let validToken = false
        while(!validToken){
            //cryptographically generate unique tokens
            data.code= generateToken(6)
            const isCodeExist =await this.findTokenByField({code:data.code})
            if(!isCodeExist){
                validToken= true;
                break;
            }
        } 
        return this.dataSource.create(record);
    }

    }

    export default TokenService;
