import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../Services/login/auth.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../Model/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone :false
})
export class LoginComponent {

  authService :AuthService = inject(AuthService);
  route :Router =inject(Router);
  loggedUser : LoginUser[]=[]


    ngOnInit(){
       this.authService.onLoginAdmin().subscribe({
        next: (res) => {
          

          res.forEach((user)=>{
            this.loggedUser.push(...Object.values(user));
            
          })
          
          

          console.log(this.loggedUser);
        },
        error: (error) => {
        }
      })
    }



   onLogIn(email :string, password : string){

    
    

  
let admin =  this.loggedUser.find((user)=> user.emailAddress === email && user.password === password);

        
 if(admin !== undefined){
  this.route.navigate(['/admin']);
  }
  else{
    // alert("UserName and Password not Correct");
//     this.loggedUser=[]
//     this.authService.onLoginUsers().subscribe({
//     next: (res) => {
//     this.loggedUser = res;
//     },
//     error: (error) => {
//     }
//     })

//     setTimeout(()=>{
//       let admin =  this.loggedUser.find((user)=> user.emailAddress === email && user.password === password);

//     if(admin !== undefined){
//       this.route.navigate(['/admin']);
//       }
//       else{
//         alert("UserName and Password not Correct");
//       }
//     },50)
 }
  
  }

}
