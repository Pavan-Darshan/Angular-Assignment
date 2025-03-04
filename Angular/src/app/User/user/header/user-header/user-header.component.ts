import { Component, inject, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { ServerService } from '../../../../Services/service/server.service';
import { User } from '../../../../Model/loginUser';
import { MenuItem, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../Services/login/auth.service';
import { SharedService } from '../../../../Services/shared.service';
import { Ticket } from '../../../../Model/Ticket';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
  standalone : false
})
export class UserHeaderComponent {
  
  constructor(private messageService: MessageService, private authService : AuthService , private sharedservice :SharedService) {}
  
  items: MenuItem[] | undefined;
  differenceCount :number =0;
  currentCount : number = 0 ;
  userRepoted :Ticket []= [];
  commentDetails : any[]=[];
  notificationData : any []=[];
  featchedIssueList :any[] =[]
    
  checked: boolean = false;
  visible: boolean = false;


  @ViewChild('drawerRef') drawerRef!: Drawer;

  loggedUser?: User;
    serverService :ServerService = inject(ServerService);
    firstLetter:string='';
    themeColor : boolean = false;
    passwordView =false;
  
  
    ngOnInit(){
      this.loggedUser=this.serverService.loggedUser[0];
      this.firstLetter=this.loggedUser.userName.slice(0,1);
      if(this.loggedUser.theme)
      {
      
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
    this.serverService.onThemeChange(""+this.loggedUser?.dataBaseId,this.themeColor).subscribe();
    
  }
  logOut(){
    this.serverService.onThemeChange(""+this.loggedUser?.dataBaseId,this.themeColor).subscribe(()=>{
      this.serverService.loggedUser=[];
    this.authService.isLogged=false});
  }


  resetUserPassword(){
 
  this.passwordView =true
    
  }
  
  passwordSet(data : NgForm){
    ( this.loggedUser?.password.toString() === data.value.currentPassword)?
      ((data.value.newPassword === data.value.confirmPassword)?
        this.serverService.reSetUserPassword(''+this.loggedUser?.dataBaseId,data.value.confirmPassword)
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
          this.featchedIssueList=res;
      
          
          setInterval(()=>{
            this.userIssueOnly();
          
          },15000)
       
    
      })
      
  
    }
  
    userIssueOnly(){
      
      this.userRepoted = this.featchedIssueList.filter((issue)=>(
        this.serverService.loggedUser[0].userId === issue.reportedId));

        this.commentNotification();
        
    }

  comment : any[]=[];
  comments :any[] =[];

  commentNotification(){
    this.userRepoted.forEach((data)=>{
     
      data.comment.forEach((com)=>{
        if(com.commenter !=''){
          this.comments.push({...com, ticketId : data.ticketId})
        }
       
      })
    })
    this.comment=this.comments;
    
      this.notification();
    
    this.comments=[];
  }


  notification(){
    this.serverService.onGetUserNotification(""+this.loggedUser?.dataBaseId).subscribe((count : number)=>{
      if (count < this.comment?.length) {
        this.currentCount = this.comment.length;
        this.differenceCount = this.comment.length-count;
        this.notificationData = this.comment.reverse().slice(0,this.differenceCount);
        this.comment=[];
      }
    })

    this.featchIssueData();
  }

  clearNotification(){
    this.notificationData=[]
    this.differenceCount=0;
    this.serverService.onUserNotification(""+this.loggedUser?.dataBaseId,this.currentCount).subscribe(()=>{});
  }
}
