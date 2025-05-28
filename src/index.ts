import express from 'express'
import dotenv from 'dotenv';
import Dbinitialize from '../src/Database/init'
dotenv.config();
import Router from './routes/authRoute';
import accountRouter from './routes/account-routes'
import transactionRouter from './routes/transaction-routes'

const SERVERPORT =process.env.SERVERPORT
const app = express();
app.use(express.json());
app.use('/api/user', Router);
app.use('/api/account', accountRouter);
app.use('/api/initiate',transactionRouter);

 const server= async function (){
    await Dbinitialize;
    try{
        app.listen(SERVERPORT,async()=>{

            console.log('server is running at port',SERVERPORT)
        });
    }
    catch(err){
          console.log(err)
    }
 };
 
server();










