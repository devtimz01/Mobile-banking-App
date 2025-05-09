const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();

class EmailService{
    static async sendMail(email:string,  code:string){
       const message = "your mail verification code is ${code}"
        return this.sendMailWithTransporter(email, message);
    }

    private static async sendMailWithTransporter(email: string, message: string){
        //setup nodemailer
        try{
            let transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.ADMIN_MAIL as string,
                    pass:process.env.ADMIN_pASS as string,
                }
            })

            const mailOption = {
                from:'process.env.ADMIN_MAIL' ,
                to: email,
                subject:"password reset mail",
                html:`<p> 
                         Sent a password reset mail, click here to reset, ${message}
                     </p>`
            } 
            return await transporter.sendMail(mailOption);
        }
        catch(err){
            console.log(err);
        }
    };

};


export default EmailService;




