import { Component, inject } from '@angular/core';
import { Ticket } from '../../../../Model/Ticket';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { ServerService } from '../../../../Services/service/server.service';
import { DateTime } from '../../../../Model/DateTime';
import { Router } from '@angular/router';
import { SharedService } from '../../../../Services/shared.service';
import { MessageService } from 'primeng/api';


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
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrl: './my-ticket.component.css',
  standalone :false
})
export class MyTicketComponent {
  featchedIssueList :any[] =[]
  filteredIssues : any[]=[];
  userRepoted : any[]=[]
  selectedIssue : Ticket []=[];
  searchValue ='';
  loading : boolean = true;
  isEdit : boolean =false;

  filterUserName : string ='';
  filterRepoterId : string ='';
  filterAssigneeId  : string ='';
  filterCategory : string ='';
  filterPriority : string ='';
  filterStatus : string ='';


  ticketID : string='';
  subject : string = ' ';
  description :string='';
  categoryID: string = '';
  subCategoryID: string = '';
  priorityID : string ='';
  createdDateTime : string ='';
  modifieDateTime : string = '';
  AssigneeID : string ='';

   
  Priority : Priority[]= [
    { name: 'Low', code: 'Low' },
    { name: 'MEDIUM', code: 'MEDIUM' },
    { name: 'HIGH', code: 'HIGH' },
    { name: 'CRITICAL', code: 'CRITICAL' }
  ];
      
  Status : any[] = [
    { label: 'Open',id :'Open'},
    {label: 'InProgress',id :'InProgress'},
    {label: 'Waiting',id :'Waiting'},
    {label: 'Fixed',id :'Fixed'},
    {label: 'Closed',id :'Closed'}
    
  ]
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

  
 


  constructor(private serverService : ServerService, private date : DateTime, 
      private messageService: MessageService ,private shareservice : SharedService ){}
  route :Router =inject(Router);
    
  ngOnInit(){
    this.featchIssueData ();
   
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
        setTimeout(()=>{
          this.loading=false
        },2000)
        this.userIssueOnly();
     
  
    })
    

  }

  userIssueOnly(){

    this.userRepoted = this.featchedIssueList.filter((issue)=>(
      this.serverService.loggedUser[0].userId === issue.reportedId))

    this.filteredIssues = this.userRepoted;
    this.shareservice.updateData(this.userRepoted);

  }
 
      
  // filter for  list of issues in table----------------------------------------->
  searchIssue() {
    if (this.searchValue) {
      this.filteredIssues = this.userRepoted.filter(issue =>
        issue.userName?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.reportedId .toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.categoryId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.subCategoryId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.subject.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.description.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.statusId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.priorityId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.createDateTime.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.lastModifiedDateTime.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        issue.assigneeId.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } 
    else {
      this.filteredIssues = [...this.userRepoted]; 
    }
  }

  
// Clear filter --------------------------------------------->
clearFilter(){
  this.searchValue='';
  this.filteredIssues = [...this.userRepoted]; 
}



  // Search filter by dropdown
  filterApply(data : NgForm){
    this.filteredIssues = this.filteredIssues.filter((issue) => (
    (data.value.filterUserName ? issue.userName?.toLowerCase().trim() === data.value.filterUserName.toLowerCase().trim() : true) &&
    (data.value.filterRepoterId ? issue.reportedId.toLowerCase().trim() === data.value.filterRepoterId.toLowerCase().trim() : true) &&
    (data.value.filterAssigneeId ? issue.assigneeId.toLowerCase().trim() === data.value.filterAssigneeId.toLowerCase().trim() : true) &&
    (data.value.filterCategory ? issue.categoryId.toLowerCase().trim() === data.value.filterCategory.toLowerCase().trim() : true) &&
    (data.value.filterPriority ? issue.priorityId.toLowerCase().trim() === data.value.filterPriority.toLowerCase().trim() : true) &&
    (data.value.filterStatus ? issue.statusId.toLowerCase().trim() === data.value.filterStatus.toLowerCase().trim() : true) 
    ));
      data.reset();
      
      
  }
    
  // Search filter Reset by dropdown
  resetFilter(){
    this.filteredIssues = this.userRepoted;
    
  }




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


editUserData : any;
editTicket(issue : Ticket){
  this.isEdit=true;
  this.editUserData =issue;
 
  this.priorityID = issue.priorityId;
  this.categoryID = issue.categoryId;
  this.subCategoryID = issue.subCategoryId;
  this.subject = issue.subject;
  this.description = issue.description;
  this.createdDateTime =issue.createDateTime;
  this.modifieDateTime = issue.lastModifiedDateTime;
  this.AssigneeID = issue.assigneeId;
  }

onSaveTicket(formDetails : NgForm){

  this.editUserData.priorityId = this.priorityID;
  this.editUserData.categoryId = this.categoryID;
  this.editUserData.subCategoryId = this.subCategoryID;
  this.editUserData.subject = this.subject;
  this.editUserData.description = this.description;
  this.editUserData.createdDateTime = this.createdDateTime;
  this.editUserData.lastModifiedDateTime = this.date.getCurrentTime();

  this.serverService.onUpdate(this.editUserData.dataBaseId, this.editUserData).subscribe( ()=> this.featchIssueData()) ? 
  this.editUserData='':this.notUpdated();


  this.isEdit=false;
  
}


cancelTicket(){
  this.route.navigate(['/user/myTicket']);
  this.isEdit=false;
}



// Image to json----------------------------------------------------------------------->
imageData : string='';

onFileChange(event: any): void {
  const file = event.target.files[0];

  if (file) {
    this.convertToJson(file);
  }
}

private convertToJson(file: File): void {
  const reader = new FileReader();

  reader.onload = () => {
    this.imageData = reader.result as string;
  };
  reader.readAsDataURL(file);
}

notUpdated(){
  this.messageService.add({ severity: 'warn', summary: 'Warn', 
    detail: "Not Updated.....!", life: 3000, key : 'tc'})
}

}
