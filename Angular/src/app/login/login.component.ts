import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../Services/login/auth.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/loginUser';
import { ServerService } from '../Services/service/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone :false
})
export class LoginComponent {

  authService :AuthService = inject(AuthService);
  serverService : ServerService = inject(ServerService);
  route :Router =inject(Router);
  logInUser : User[]=[]

  loggedUser : User []=[];
  isAccountLogged =false;


    ngOnInit(){
       this.authService.onLoginAdmin().subscribe({
        next: (res) => {
          this.logInUser=res;
        },
        error: (error) => {
        }
      })
    }



   onLogIn(email :string, password : string){
let admin =  this.authService.isAdminUser.find((user)=> user.emailAddress === email && user.password === password);
        
 if(admin !== undefined){
  this.isAccountLogged=true;
  this.loggedUser.push(admin);
  this.serverService.loggedUser.push(admin);
  this.serverService.isAccountLogged=true;
  this.route.navigate(['/admin']);
  }
  else{
    let user=this.authService.isUsers.find((user)=> user.emailAddress === email && user.password === password);

    if( user !== undefined){
      this.isAccountLogged=true;   
      this.loggedUser.push(user);
      this.serverService.loggedUser.push(user);
      this.serverService.isAccountLogged=true;
      this.route.navigate(['/user'])
    }
    else
      alert("UserName and Password not Correct");   
 }
}

}
