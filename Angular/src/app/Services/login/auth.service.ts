import { inject, Injectable } from "@angular/core";
import { LoginUserDetails } from "./login-User-Details";
import { Router } from "@angular/router";
import { ServerService } from "../service/server.service";
import { LoginUser } from "../../Model/loginUser";
import { filter, map } from "rxjs";
import { __values } from "tslib";

@Injectable({
    providedIn :'root'
})

export class AuthService{


    loginUserDetails :LoginUserDetails =inject(LoginUserDetails);
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
                  this.isAdminUser.push({...response[key]});
                    
                   
                }

                else{
                    this.isUsers.push({...response[key]})
                    
                }
                
            }
        }
            
            
            
            return this.isAdminUser;
     }))
        
    }
       
        
//     }

//     onLoginUsers(){
//         return this.serverService.onLogUsers()
//        .pipe(map((response)=>{

           
         
//            for(let key in response){
//              if(response.hasOwnProperty(key))
//              {
//                this.loggedUser.push({...response[key]})
//              }
//            }

//            console.log(this.loggedUser);
//            return this.loggedUser;
//           }
//        ))
      
       
//    }

}