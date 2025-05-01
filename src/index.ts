import express from 'express'
import dotenv from 'dotenv';
import Dbinitialize from '../src/Database/init'
dotenv.config();

const SERVERPORT =process.env.SERVERPORT
const app = express();
app.use(express.json());

 const Bootstrap= async function (){
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

Bootstrap;










