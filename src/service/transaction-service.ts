import { IpaymentObject } from "../interfaces/transaction-interface";
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv'
dotenv.config();
import axios from "axios";

class TransactionService{

    private static async referenceLink(){
        return uuidv4;
    }

   public static async paymentUrlLink(email:string, amount:number):Promise<IpaymentObject| null>{
        //send paystack paymentInitiation Url
        //transfer method:card
        try{
            //amount in kobo
            const amountInKobo = amount * 100
            const params={
                method:'[card]',
                amount: amountInKobo,
                email,
                callback_url:`${process.env.CALLBACK_URL}` as string,
                reference: TransactionService.referenceLink

            }
            const config={
             headers:{
                 Authorization: `Bearer${process.env.THIRDPARTYAPI_SECRET_KEY}` as string,
                "content-type": 'appliction/json'
             }
            }

           const {data}= await axios.post("https://api.paystack.co/transaction/initialize",params,config)
           if(data && data.status){
            return data.data
           }
           return null;
        }
        catch(err){
           return null;
        }    
    };
    
    async verifyTransactions(){}
    async internalMoneyTransfer(){

    }
    async realBankTransfer(){

    }
    async requestLoan(){

    }
    //sort beneficiaries logic:last5 or more
    async fetchOne(){}

};

export default TransactionService;
