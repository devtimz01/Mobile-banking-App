import UserService from "../service/service";
import express from 'express';

class Authentication{
    UserService;

    constructor(_userService: UserService){
        this.UserService = UserService;
    }

   async register(){ 
        try{
            //user exists
        }
        catch(err){
            //create new user
            
        }
   }
 };


