import express,{Request, Response} from 'express'
import Account from '../controllers/account';
import AccountService from '../service/account-info-service';
import AccountDataSource from '../DataSource/account-datasource';
import validationSchema from '../validator/userAccount-validator-schema';
import { Auth, validator } from '../middleware/validator-middleware';

const Router = express.Router();
const accountService =new AccountService(new AccountDataSource())
const controller = new Account(accountService)

Router.post('/createAccount',validator(validationSchema.userAccountSchema),Auth(),(req:Request,res:Response)=>{
    controller.createAccountNumber(req,res);
})

Router.get('/:id',Auth(),(req:Request,res:Response)=>{
    controller.findAccount(req,res);
})
Router.get('/findAllAccount',Auth(),(req:Request,res:Response)=>{
    controller.findAllAccount(req,res)
})

export default Router;
