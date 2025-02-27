import { Component, inject, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { ServerService } from '../../../../Services/service/server.service';
import { User } from '../../../../Model/loginUser';
import { MenuItem, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../Services/login/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
  standalone : false
})
export class UserHeaderComponent {
  
  constructor(private messageService: MessageService, private authService : AuthService) {}
  
  items: MenuItem[] | undefined;

    
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
    }
  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }


  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    this.themeColor = !this.themeColor;
    console.log(this.themeColor);
    
  }
  logOut(){
    this.serverService.onThemeChange(""+this.loggedUser?.dataBaseId,this.themeColor).subscribe(()=>this.authService.isLogged=false);
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


}
