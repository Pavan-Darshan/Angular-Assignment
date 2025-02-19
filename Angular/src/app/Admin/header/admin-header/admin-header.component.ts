import { Component, inject, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { User } from '../../../Model/loginUser';
import { ServerService } from '../../../Services/service/server.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
  standalone :false
})
export class AdminHeaderComponent {

  items: MenuItem[] | undefined;

    
  checked: boolean = false;
  visible: boolean = false;


  @ViewChild('drawerRef') drawerRef!: Drawer;

  loggedUser?: User;
    serverService :ServerService = inject(ServerService);
    firstLetter:string='';
    
  
  
    ngOnInit(){
      this.loggedUser=this.serverService.loggedUser[0];
      this.firstLetter=this.loggedUser.userName.slice(0,1);

     
    }

  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }

  
 

 

}
