import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../../../../Model/loginUser';
import { ServerService } from '../../../../Services/service/server.service';
import { Ticket } from '../../../../Model/Ticket';
import { Comment } from '../../../../Model/comment';
import { DateTime } from '../../../../Model/date-time';




interface Priority {
  name: string;
  code: string;
}

interface Issue {
  label: string;
  value: string;
  code :string;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone :false
})

export class FormComponent {

  serverService :ServerService = inject(ServerService);

  ticketID : string='7246';
  subject : string = ' ';
  description :string='';
  categoryID: string = '';
  subCategoryID: string = '';
  priorityID : string ='';
  newTicket : Ticket | undefined;
  comment : Comment[]=[{
    commenter:'',
    comment :'',
    commentedDate:'',
  }]

  


  @Output() isForm  = new EventEmitter();

  loggedUser?: User;

  
  ngOnInit() {
    this.loggedUser=this.serverService.loggedUser[0];
   
}


  priority : Priority[]= [
    { name: 'Low', code: 'Low' },
    { name: 'MEDIUM', code: 'MEDIUM' },
    { name: 'HIGH', code: 'HIGH' },
    { name: 'CRITICAL', code: 'CRITICAL' }
  ];


  // Define categories
  categories = [
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Software', value: 'Software' },
    { label: 'Access Management', value: 'Access Management' }
  ];

  hardwareIssues : Issue[]= [
    { label: 'Allocate Laptop', value: 'Allocate Laptop' ,code :'HW#001'},
    { label: 'Allocate Hardware', value: 'Allocate Hardware',code :'HW#002' },
    { label: 'Hardware replacement', value: 'Hardware replacement',code :'HW#003' }
  ];

  softwareIssues : Issue[] = [
    { label: 'Software Installation', value: 'Software Installation',code :'SW#001'},
    { label: 'Antivirus', value: 'Antivirus',code :'HW#001' },
    { label: 'Email Password update', value: 'Email Password update',code :'SW#002' },
    { label: 'Laptop Slowness issue', value: 'Laptop Slowness issue',code :'SW#003' },
    { label: 'Software Issue', value: 'Software Issue',code :'SW#004' }
  ];

  accessManagementIssues : Issue[] = [
    { label: 'Software access', value: 'Software access',code :'AM#001' },
    { label: 'Wifi Access', value: 'Wifi Access',code :'AM#002' },
    { label: 'Database Access', value: 'Database Access',code :'AM#003' },
    { label: 'VPN Access', value: 'VPN Access',code :'AM#004' },
    
  ];

  
 
   

  availableIssues : Issue[]= [];

  onCategoryChange() {
    switch (this.categoryID) {
      case 'Hardware':
        this.availableIssues = this.hardwareIssues;
        
        break;
      case 'Software':
        this.availableIssues = this.softwareIssues;
        break;
      case 'Access Management':
        this.availableIssues = this.accessManagementIssues;
        break;
      default:
        this.availableIssues = [];
    }
    this.subCategoryID = '';  // Reset 
  }

  onSaveTicket(){

    // Date and time
   
  
    const createDateTime=DateTime.slice(0,11)+""+DateTime.slice(12)    //27-Jul-2022 10:00 AM
    
    this.newTicket={
      ticketId : this.ticketID,
      categoryId : this.categoryID, 
      subCategoryId : this.subCategoryID,
      assigneeId : '---',
      reportedId : ''+this.loggedUser?.userId ,
      subject : this.subject,
      description :this.description,
      statusId : 'Open',
      priorityId : this.priorityID,
      createDateTime :createDateTime,
      lastModifiedDateTime : '---',
      userName:''+this.loggedUser?.userName,
      comment :this.comment
  
    }

  
    let sucesss=this.serverService.createTicket(this.newTicket,''+this.loggedUser?.userId);
    if(sucesss)
      alert(`Ticket Created Successfully. Ticket ID : ${this.ticketID}`);

    this.isForm.emit(false);
  }

  cancelTicket(){
    this.isForm.emit(false);
  }

}
