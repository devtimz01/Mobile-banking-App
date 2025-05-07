import express,{Request,Response} from "express";
import UserService from "../service/service";
import DataSource from "../DataSource/datasource";
import Authentication from "../controllers/auth";
import TokenDataSource from "../DataSource/token-datasource";
import TokenService from "../service/tokenService";

const Router= express.Router();
const userService = new UserService(new DataSource)
const tokenService = new TokenService(new TokenDataSource)
const controller = new Authentication(userService, tokenService)

Router.post('/signup',(req: Request ,res: Response)=>{
     controller.register(req,res);
});
Router.post('/login',(req: Request ,res: Response)=>{
     controller.login(req,res);
});


export default Router;
