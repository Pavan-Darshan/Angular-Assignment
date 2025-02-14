import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../Model/loginUser";
import { map, Subject } from "rxjs";
import { Ticket } from "../../Model/Ticket";

@Injectable({
    providedIn : 'root'
})
export class ServerService{

http :HttpClient =inject(HttpClient);
errorSubject :Subject<HttpErrorResponse> =new Subject<HttpErrorResponse>();
loggedUser:User[]=[]; // logged user
isAccountLogged :boolean=false;


 onLogAdmin(){
      return  this.http.get<{[key : string]:User }>('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser.json')

}

// Create Ticket
createTicket(data : Ticket,id : string)
{
    const header = new HttpHeaders({'my-header' : 'Project-header'});
    return this.http.post('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/Issues.json',data,{headers : header})
    .subscribe({
        error :(err)=>{
            this.errorSubject.next(err);
            }
        })
}

//Featch Issue Data 

featchIssueList(){
    return  this.http.get<{[key : string]:Ticket }>('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/Issues.json')
}

onUpdate(dataBaseId : string ,data :Ticket){
 
    return this.http.put('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/Issues/'+dataBaseId+'.json',data).subscribe();

}

onDeleteUser(dataBaseId : string,id :string){
    return this.http.delete('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/Issues/'+dataBaseId+'.json')
    .subscribe(()=>{})
}

onUserList(){
    return this.http.get<[key : String]>('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser/users.json')
}
onUserCreate(userData : any){
    return this.http.post('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser/users.json',userData)
}
onUpdateUser(dataBaseId : string, data: User){
    return this.http.post('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/LogUser/users/'+dataBaseId+'.json',data)
  
}
}
