import { Component } from '@angular/core';
import { Ticket } from '../../../../Model/Ticket';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { ServerService } from '../../../../Services/service/server.service';
import { DateTime } from '../../../../Model/DateTime';
import { MessageService } from 'primeng/api';


interface Priority {
  name: string;
  code: string;
}

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrl: './my-ticket.component.css',
  standalone :false
})
export class MyTicketComponent {
  featchedIssueList :any[] =[]
  filteredIssues : any[]=[]
  selectedIssue : Ticket []=[];
  searchValue ='';
  loading : boolean = true;


  filterUserName : string ='';
  filterRepoterId : string ='';
  filterAssigneeId  : string ='';
  filterCategory : string ='';
  filterPriority : string ='';
  filterStatus : string ='';

   
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


  constructor(private serverService : ServerService, private date : DateTime, private messageService: MessageService){}
    
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

    this.filteredIssues = this.featchedIssueList.filter((issue)=>(
      this.serverService.loggedUser[0].userId === issue.reportedId
    ))

  }
 
      
  // filter for  list of issues in table----------------------------------------->
  searchIssue() {
    if (this.searchValue) {
      this.filteredIssues = this.featchedIssueList.filter(issue =>
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
      this.filteredIssues = [...this.featchedIssueList]; 
    }
  }

  
// Clear filter --------------------------------------------->
clearFilter(){
  this.searchValue='';
  this.filteredIssues = [...this.featchedIssueList]; 
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
    this.filteredIssues = this.featchedIssueList;
    
  }

  deleteIssue(issue : Ticket){
    let id = issue.ticketId;
    this.serverService.onDeleteUserIssue(""+issue.dataBaseId).subscribe(()=>{  
      this.deleteMessage(id);
     this.featchIssueData();
    })
  
  }

  deleteMessage(id : any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Ticket ID :'+id+'  is deleted', life: 5000 });
}

}
