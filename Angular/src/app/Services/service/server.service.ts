import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginUser } from "../../Model/loginUser";
import { map } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ServerService{

http :HttpClient =inject(HttpClient);


 onLogAdmin(){
      return  this.http.get<{[key : string]:LoginUser }>('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser.json')

}
// onLogUsers(){
//     return  this.http.get<{[key : string]:LoginUser }>('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser/users.json')

// }


}