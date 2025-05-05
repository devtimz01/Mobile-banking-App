
class TokenService{
    async sendToken(){
        const tokenData={
            key:'',
            status:'',
            expiresAt:''

        }
       let token=  this.createtoken(tokenData)
    }
    async createtoken(){
      //check for unique token

    }
};

