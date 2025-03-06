import {  AfterContentChecked, AfterViewChecked, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { User } from '../../../Model/loginUser';
import { ServerService } from '../../../Services/service/server.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../Services/login/auth.service';
import { Ticket } from '../../../Model/Ticket';
import { SharedService } from '../../../Services/shared.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
  standalone :false
})
export class AdminHeaderComponent implements OnDestroy{
  
  
  items: MenuItem[] | undefined;
  constructor(private router : Router, private messageService: MessageService,
    private sharedService : SharedService){
 
  }
 
  ngOnDestroy(): void {
    this.logOut();
  }
 
  checked: boolean = false;
  visible: boolean = false;
  passwordView =false;
  @ViewChild('drawerRef') drawerRef!: Drawer;
  loggedUser?: User;
  serverService :ServerService = inject(ServerService);
  authService : AuthService = inject(AuthService);
  firstLetter:string='';
  themeColor : boolean =false;
  notificationData : Ticket []=[];
  differenceCount : number = 0;
  receivedData: Ticket []=[];
  currentCount :number =0;


  
ngOnInit(){
  this.loggedUser=this.serverService.loggedUser[0];
  this.firstLetter=this.loggedUser.userName.slice(0,1);
    if(this.loggedUser.theme){
      this.toggleDarkMode();
      this.themeColor = true;
    }
 
      this.featchIssueData();
}




  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }


  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    this.themeColor = !this.themeColor;
    if(this.loggedUser?.userId === '101'){
      this.serverService.onAdminSenior(this.themeColor)
        .subscribe();
    }
    else
      this.serverService.onAdmin102(this.themeColor).subscribe();


  }
  logOut(){
    
    if(this.loggedUser?.userId === '101'){
      this.serverService.onAdminSenior(this.themeColor)
        .subscribe(()=>{
          this.serverService.loggedUser=[];
          this.authService.isLogged=false});
        
    }
    else
      this.serverService.onAdmin102(this.themeColor).subscribe(()=>{
        this.serverService.loggedUser=[];
        this.authService.isLogged=false});
  }


  
  
    
resetUserPassword(){

this.passwordView =true
  
}

passwordSet(data : NgForm){
  ( this.loggedUser?.password.toString() === data.value.currentPassword)?
    ((data.value.newPassword === data.value.confirmPassword)?
      ((this.loggedUser?.userId === '101')) ?
      this.serverService.reSetAdminSeniorPassword(data.value.confirmPassword)
      .subscribe(()=>{
        this.successReset();
        this.logOut();
      }):
      this.serverService.reSetAdminPassword(data.value.confirmPassword)
      .subscribe(()=>{
        this.successReset();
        this.logOut();
      })

      : this.passwordNotMatch())
    
  : this.currentPasswordNotMatch();
  data.reset();
}

passwordNotMatch(){
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'New Password and Confirm Password are not matched...', life: 3000 });

}
currentPasswordNotMatch(){
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'You entered wrong user password', life: 3000 });

}

successReset(){
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your Password is successfully updated.... ', life: 3000 });
  this.passwordView = false;
}

cancelPasswordReset(data : NgForm){
  this.passwordView =false;
  data.reset();
}



  
// Featching issue List --------------------->
featchIssueData(){
  
  this.serverService.featchIssueList()
  .pipe(map((response)=>
    {
  
    let data :Ticket [] = [];
    
    for(let key in response){
      if(response.hasOwnProperty(key))
        data.push({...response[key],dataBaseId:key})
    }
    return data;
  }))
  .subscribe((res)=>{
      this.receivedData=res;
      // this.notification();
    setTimeout(()=>{
      this.notification();
    },70000)
          
  })
  
}

// notification
notification(){
  // this.loggedUser=this.serverService.loggedUser[0];
  // this.sharedService.currentData.subscribe(data => {
  //   this.receivedData = data;
  // });

  
  this.serverService.onGetNotificationAdminSenior().subscribe((count : number)=>{
    if (count  < this.receivedData?.length) {
      this.currentCount=this.receivedData.length;
      this.differenceCount=this.receivedData.length-count;
      this.notificationData = this.receivedData.reverse().slice(0,this.differenceCount);
      this.receivedData=[];
  
    }

    
  })
  this.featchIssueData();
  

}

  

clearNotification(){

  this.notificationData=[]
  this.differenceCount=0;
  this.serverService.onAdminSeniorNotification(this.currentCount).subscribe(()=>{
    console.log("sucess");
    
  });
}
}
