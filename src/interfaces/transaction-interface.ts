import { Model, Optional } from "sequelize";

//transaction type in JSON
interface Itransaction{
    id: string;
    refId:string;

};
interface IfindTransaction{
    where:{
        [key:string]: string
    },
    raw?: boolean,
    returning:boolean
};

interface ItransactionCreationBody extends Optional<Itransaction,"id">{}
interface ItransactionModel extends Model<Itransaction, ItransactionCreationBody>,Itransaction{}
interface ItransactionDataSource{
    create(record: ItransactionCreationBody): Promise<Itransaction>;
    fetch(query:IfindTransaction):Promise<Itransaction | null>
};

