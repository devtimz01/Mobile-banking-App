import express,{Request,Response} from "express";
import TransactionService from "../service/transaction-service";
import TransactionDataSource from "../DataSource/transaction-dataource";
import TransactionController from "../controllers/transaction";
import { Auth,validator } from "../middleware/validator-middleware";
import { transactionValidationSchema } from "../validator/transaction-validator";

const Router= express.Router();
const transactionService = new TransactionService(new TransactionDataSource)
const controller = new TransactionController(transactionService)

Router.post('/deposit', validator(transactionValidationSchema.transactionSchema) ,Auth(),(req: Request ,res: Response)=>{
     controller.initiateDeposit(req,res);
});

export default Router;
