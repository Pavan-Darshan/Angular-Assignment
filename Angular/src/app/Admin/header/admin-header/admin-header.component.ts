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

      this.items = [
        {
            label: 'File',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    items: [
                        {
                            label: 'Document',
                            icon: 'pi pi-file'
                        },
                        {
                            label: 'Image',
                            icon: 'pi pi-image'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-video'
                        }
                    ]
                },
                {
                    label: 'Open',
                    icon: 'pi pi-folder-open'
                },
                {
                    label: 'Print',
                    icon: 'pi pi-print'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            items: [
                {
                    label: 'Copy',
                    icon: 'pi pi-copy'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times'
                }
            ]
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
            items: [
                {
                    label: 'Slack',
                    icon: 'pi pi-slack'
                },
                {
                    label: 'Whatsapp',
                    icon: 'pi pi-whatsapp'
                }
            ]
        }
    ]
    
      
    }

  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }

  
 

 

}
