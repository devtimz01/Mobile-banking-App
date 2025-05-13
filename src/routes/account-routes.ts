import express,{Request, Response} from 'express'
import Account from '../controllers/account';
import AccountService from '../service/account-info-service';
import AccountDataSource from '../DataSource/account-datasource';
import validationSchema from '../validator/userAccount-validator-schema';
import { validator } from '../middleware/validator-middleware';

const Router = express.Router();
const accountService =new AccountService(new AccountDataSource())
const controller = new Account(accountService)

Router.post('/createAccount',validator(validationSchema.userAccountSchema),(req:Request,res:Response)=>{
    controller.createAccountNumber(req,res);
})

export default Router;