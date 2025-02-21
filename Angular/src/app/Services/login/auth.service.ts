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
                        this.isUsers.push(...Object.values(user));
                 
                        
                    })  
                }
            }
        } console.log(this.isUsers);
            return this.isUsers;
     }))
        
    }

}