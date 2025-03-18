import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../../../../Model/loginUser';
import { ServerService } from '../../../../Services/service/server.service';
import { Ticket } from '../../../../Model/Ticket';
import { Comment } from '../../../../Model/comment';
import { DateTime } from '../../../../Model/DateTime';
import { Router } from '@angular/router';
import { TicketUniqueId } from '../../../../Model/ticket-Id-Create';
import { NgForm } from '@angular/forms';





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


  constructor(private serverService :ServerService, 
            private date : DateTime, 
            private ticketUniqueID : TicketUniqueId,
           private messageService: MessageService,){}
   route :Router =inject(Router);

  ticketID : string='';
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



  loggedUser?: User;

  
  ngOnInit() {
    this.loggedUser=this.serverService.loggedUser[0];
   
}


  priority : Priority[]= [
    { name: 'LOW', code: 'LOW' },
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

  onSaveTicket(formDetails : NgForm){

    // Date and time
    const createDateTime= this.date.getCurrentTime().slice(0,11)+""+this.date.getCurrentTime().slice(12) ;   //27-Jul-2022 10:00 AM
    
    this.newTicket={
      ticketId : this.ticketUniqueID.generateUniqueId(),
      categoryId : this.categoryID, 
      subCategoryId : this.subCategoryID,
      assigneeId : '---',
      reportedId : ''+this.loggedUser?.userId ,
      subject : this.subject,
      description :this.description,
      statusId : 'Open',
      priorityId : this.priorityID,
      createDateTime :createDateTime,
      lastModifiedDateTime : createDateTime,
      userName:''+this.loggedUser?.userName,
      comment :this.comment,
      imageData:this.imageData
  
    }
    

    // Alert for Ticket created------------------------------------------------------->
    this.serverService.createTicket(this.newTicket,''+this.loggedUser?.userId) ?
    this.ticketCreated(this.newTicket.ticketId)
       : null;
      formDetails.reset();
    this.route.navigate(['/user/dashboard']);
  }

  cancelTicket(){
    this.route.navigate(['/user/dashboard'])
  }

// Image to json----------------------------------------------------------------------->
  imageData : string='';

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      this.convertToJson(file);
    }
    else {
      this.validImage();
    }
  }

  private convertToJson(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  ticketCreated(id : string){
    this.messageService.add({ severity: 'success', summary: 'Success', 
      detail: `Ticket Created Successfully. Ticket ID : ` +id, life: 3000 , key : 'tc' })
  }

  validImage(){
    this.messageService.add({ severity: 'info', summary: 'Info', 
      detail: 'Please upload a valid image file.', life: 3000 , key : 'tc' })
  }

}
