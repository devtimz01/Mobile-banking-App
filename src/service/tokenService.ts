import { Itoken, ItokenCreationBody } from "../interfaces/token-interarface";
import { IinsertTypes } from "../interfaces/token-interarface";
import TokenDataSource from "../DataSource/token-datasource";
import crypto from 'crypto';
import moment from 'moment'
import { error } from "console";
import { raw } from "express";

//errm, what's my role in this now??
class TokenService{
    private dataSource: TokenDataSource
    constructor(_dataSource: TokenDataSource){
        this.dataSource= _dataSource;
    }
    private readonly tokenExpires : number= 5;
    public tokenType ={
         FORGOT_PASSWORD: 'forgot password'
    }
    public tokenStatus={
        NOT_USED: 'not used',
        USED: 'used'
    }

    async findTokenByField(record:Partial<Itoken>): Promise<Itoken| null>{
        const query={where:{...record},raw:true} as IinsertTypes
       return await this.dataSource.fetchOne(query)
    }

    async sendForgotPasswordToken(email: string): Promise<Itoken| null>{
        const tokenData={
            key: email,
            type: this.tokenType.FORGOT_PASSWORD,
            status:this.tokenStatus.NOT_USED,
            expires: moment().add(this.tokenExpires,'minute').toDate()
        } as ItokenCreationBody

        let token =  await this.createToken(tokenData)
        return token;  
    }

    async createToken(record: ItokenCreationBody){
        const tokenData = {...record} 
        let validToken = false
        while(!validToken){
            //cryptographically generate unique tokens
            const generateToken=(num: number)=>{
                let digit= '012345'
                let code =''
                for(let i=0; i<num ; i++){
                    const randomIndex= crypto.randomBytes(1)[0]%digit.length
                    code+=digit[randomIndex]
                }
                return code;
            }
            tokenData.code= generateToken(6)
            const isCodeExist =await this.findTokenByField({code:tokenData.code})
            if(!isCodeExist){
                validToken= true;
                break;
            }
        } 
        return this.dataSource.create(tokenData);
    }
    
    async updateOne(data:Partial<Itoken>, record:Partial<Itoken>): Promise<void>{
        const query ={
            where:{
                ...record
            },
            raw: true
        } as IinsertTypes
        this.dataSource.updateOne(data,query);
    }
}
    export default TokenService;
