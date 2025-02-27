import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "../service/server.service";
import { User } from "../../Model/loginUser";
import {  map } from "rxjs";
import { __values } from "tslib";

@Injectable({
    providedIn :'root'
})

export class AuthService{


    route :Router =inject(Router);
    serverService :ServerService =inject(ServerService);

    isAdminUser : User[] =[];
    isUsers : User[] =[];
    dataBaseKey :any[]=[]
    isLogged :boolean =false;

     
onLoginAdmin(){
        return this.serverService.onLogAdmin()
    .pipe(map((response)=>{

        for(let key in response){
            if(response.hasOwnProperty(key))
            {
                if(key === 'admin'){
                let temp :User[]=[]
                temp.push({...response[key]});

                temp.forEach((user)=>{      
                    this.isAdminUser.push(...Object.values(user));
                }) 
                }

                else{
                    
                    let temp :User[]=[]
                    
                    temp.push({...response[key]});     
                    temp.forEach((user)=>{ 
                    this.dataBaseKey.push(...Object.keys(user));
                    this.isUsers.push(...Object.values(user)); 
                    
                })  
            
                for( key in this.dataBaseKey){   
                    this.isUsers[key].dataBaseId = this.dataBaseKey[key];
                    this.serverService.onUpdateUser(this.dataBaseKey[key],this.isUsers[key]).subscribe();
                } 
                
            }
        }
    } 
    
        return this.isUsers;
    }))
    
}

loggedSuccess(){
    this.isLogged =true;
}

logOut(){
    this.isLogged = false;
}

isAuthenticated(){
    return this.isLogged;
}

}