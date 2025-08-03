import { IpaymentObject } from "../interfaces/transaction-interface";
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv'
dotenv.config();
import axios from "axios";

class PaymentService{
    private static async referenceLink(){
        return uuidv4();
    }
   public static async paymentUrlLink(email:string, amount:number):Promise<IpaymentObject| null>{
        //send paystack paymentInitiation Url
        //transfer method:card
        try{
            //amount in kobo
            const amountInKobo = amount * 100
            const params={
                method:["card"],
                amount: amountInKobo,
                email,
                callback_url:`${process.env.CALLBACK_URL}` as string,
                reference: await PaymentService.referenceLink()
            };

            const config={
             headers:{
                 Authorization: `Bearer ${process.env.THIRDPARTYAPI_SECRET_KEY}` as string,
                "Content-Type": 'application/json'
             }
            };

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
    
   public static async verifyTransactions(reference: string,amount: number): Promise<Boolean>{
        try{
            const config={
             headers:{
                 Authorization: `Bearer ${process.env.THIRDPARTYAPI_SECRET_KEY}` as string,
                "Content-Type": 'application/json'
             }
            };

           const {data}= await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,config)
           if(data && data.status){
            const {amount:amountInKobo}= data.data
            if(amountInKobo !== (amount * 100)){
                return false
            }
            return true
           }
           return false;

        }catch(err){
            return false;
        }
    }
};

export default PaymentService;
