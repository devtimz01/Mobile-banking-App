import express from 'express'
import dotenv from 'dotenv';
import Dbinitialize from '../src/Database/init'
dotenv.config();

const PORT =process.env.PORT
const app = express();
app.use(express.json());

 const Bootstrap= async function (){
    await Dbinitialize;
    try{
        app.listen(PORT,async()=>{

            console.log('server is running at port',PORT)
        });
    }
    catch(err){
        console.log(err)
    }
 };

Bootstrap;








