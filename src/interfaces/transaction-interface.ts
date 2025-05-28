import { Model, Optional ,Transaction} from "sequelize";

//transaction type in JSON
interface ItransactionDetail{
    gateway?: string;
    recieverAccountNumber: string;
}
export interface IpaymentObject{
    authorization_url: string;
    access_code: String;
    reference: string;
}
export interface Itransaction{
    id: string;
    refId:string;
    userId:string;
    accountId: string;
    type: string;
    status:string;
    amount:number;
    details:ItransactionDetail;
    createdAt:String;
    updatedAt: string;
};
export interface IfindTransaction{
    where:{
        [key:string]: string
    },
    raw?: boolean,
    transaction?: Transaction,
    returning:boolean
};

export interface ItransactionCreationBody extends Optional<Itransaction,"id"|"createdAt"|"updatedAt">{}
export interface ItransactionModel extends Model<Itransaction, ItransactionCreationBody>,Itransaction{}
export interface ItransactionDataSource{
    create(record: ItransactionCreationBody): Promise<Itransaction>;
    fetch(query:IfindTransaction):Promise<Itransaction | null>
};

