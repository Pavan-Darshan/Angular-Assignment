import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "../service/server.service";
import { LoginUser } from "../../Model/loginUser";
import { filter, map } from "rxjs";
import { __values } from "tslib";

@Injectable({
    providedIn :'root'
})

export class AuthService{


    route :Router =inject(Router);
    serverService :ServerService =inject(ServerService);

    isAdminUser : LoginUser[] =[];
    isUsers : LoginUser[] =[];


     
    onLoginAdmin(){
         return this.serverService.onLogAdmin()
        .pipe(map((response)=>{

            for(let key in response){
              if(response.hasOwnProperty(key))
              {
                    if(key === 'admin'){
                    let temp :LoginUser[]=[]
                    temp.push({...response[key]});

                    temp.forEach((user)=>{      
                        this.isAdminUser.push(...Object.values(user));
                    }) 
                    }

                    else{
                        let temp :LoginUser[]=[]
                        temp.push({...response[key]});
    
                        temp.forEach((user)=>{      
                        this.isUsers.push(...Object.values(user));
                        
                    })  
                }
            }
        }
            return this.isUsers;
     }))
        
    }

}