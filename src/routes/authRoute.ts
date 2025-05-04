import express,{Request,Response} from "express";
import UserService from "../service/service";
import DataSource from "../DataSource/datasource";
import Authentication from "../controllers/auth";


const Router= express.Router();
const userService = new UserService(new DataSource)
const controller = new Authentication(userService)

Router.post('/signup',(req: Request ,res: Response)=>{
     controller.register(req,res);
});


export default Router;
