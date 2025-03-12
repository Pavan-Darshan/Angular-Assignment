import { Component, OnChanges, OnInit } from '@angular/core';
import { Ticket } from '../../../Model/Ticket';
import { ServerService } from '../../../Services/service/server.service';
import { map } from 'rxjs';
import { User } from '../../../Model/loginUser';
import { DateTime } from '../../../Model/DateTime';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../Services/shared.service';


interface Priority {
  name: string;
  code: string;
}



@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css',
  standalone : false,
})
export class IssueComponent implements OnInit,OnChanges{
   

  constructor(
    private serverService : ServerService, private date : DateTime, 
    private messageService: MessageService,  private sharedService :SharedService,
    private confirmationService: ConfirmationService){}
  
  

  isFormActive :boolean = false;
  featchedIssueList :Ticket []=[];
  selectedIssue : Ticket []=[];
  filteredIssues :any []=[];
  searchValue =''
  loading:boolean= true;
  commentDisplay : boolean =false;
  viewIssueDetails ?:any;
  text :string='';
  editDisplay :boolean = false;
  editUserData : any;
  priorityID : string ='';
  assigneeID : string = '';
  statusID : string ='';
  lastModifiedDateTime : string = '';

  isStatusClosed : boolean = false;
  isSatatusOpen : boolean = false;
  
  filterUserName : string ='';
  filterRepoterId : string ='';
  filterAssigneeId  : string ='';
  filterCategory : string ='';
  filterPriority : string ='';
  filterStatus : string ='';
 

  // checking for Toast message--------------->
  checkePriority : string='';
  checkStatus : string ='';
  checkAssignee : string ='';


categories = [
  { label: 'Hardware', value: 'Hardware' },
  { label: 'Software', value: 'Software' },
  { label: 'Access Management', value: 'Access Management' }
];

Priority : Priority[]= [
  { name: 'Low', code: 'LOW' },
  { name: 'MEDIUM', code: 'MEDIUM' },
  { name: 'HIGH', code: 'HIGH' },
  { name: 'CRITICAL', code: 'CRITICAL' }
];

Assignee : any[] = [
  {name: 'Admin-Pavan',id :'101'},
  {name : 'Admin-Darshan',id : '102'}
]

Status : any[] = [
  { label: 'Open',id :'Open'},
  {label: 'InProgress',id :'InProgress'},
  {label: 'Waiting',id :'Waiting'},
  {label: 'Fixed',id :'Fixed'},
  {label: 'Closed',id :'Closed'}
  
]

ngOnInit(){
  this.featchIssueData ();

  
}
ngOnChanges(){
  this.featchIssueData ();
}


 



  onCreateTicket(){
    this.isFormActive = true;}

  onSaveTicket(value : boolean){
    this.isFormActive = value;
    if(!value)
      this.featchIssueData();
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
        this.filteredIssues = [...this.featchedIssueList]; // copying data to filter in table list
        this.groupIssuesByStatus(); // type of status
    })
  }


  // splitting the issues status to array-------------->

  groupedIssues: any = {
    open: [],
    inProgress: [],
    waiting: [],
    fixed: [],
    closed: []
  };

  open: any[] =[]
  inProgress: any[]=[]
  waiting: any[]=[]
  fixed: any[]=[]
  closed: any[]=[]
 

  groupIssuesByStatus() {
   
    this.open = this.featchedIssueList.filter(issue => issue.statusId === 'Open');
    this.inProgress = this.featchedIssueList.filter(issue => issue.statusId === 'InProgress');
    this.waiting = this.featchedIssueList.filter(issue => issue.statusId === 'Waiting');
    this.fixed = this.featchedIssueList.filter(issue => issue.statusId === 'Fixed');
    this.closed = this.featchedIssueList.filter(issue => issue.statusId === 'Closed');
    this.open.reverse();
    this.inProgress.reverse();
    this.waiting.reverse();
    this.fixed.reverse();
    this.closed.reverse();
    
    this.loadOpen();
    this.loadinProgress();
    this.loadwaiting();
    this.loadfixed();
    this.loadclosed();
    
  }

  currentOpen = 0;
  currentinProgress = 0;
  currentwaiting = 0;
  currentfixed = 0;
  currentclosed = 0;
  items =5;
  loadOpen(){
    
    this.groupedIssues.open =[];
    this.groupedIssues.open =this.open.slice(0,this.currentOpen+this.items);
    this.currentOpen+=this.items; 
  }

  loadinProgress(){
    this.groupedIssues.inProgress =[];
    this.groupedIssues.inProgress =this.inProgress.slice(0,this.currentinProgress+this.items);
    this.currentinProgress+=this.items;
  }

  loadwaiting(){
    this.groupedIssues.waiting =[]
    this.groupedIssues.waiting =this.waiting.slice(0,this.currentwaiting+this.items);
    this.currentwaiting+=this.items;
  }
 
  loadfixed(){
    this.groupedIssues.fixed = [];
    this.groupedIssues.fixed =this.fixed.slice(0,this.currentfixed+this.items);
    this.currentfixed+=this.items;
  }

  loadclosed(){
    this.groupedIssues.closed =[];
    this.groupedIssues.closed =this.closed.slice(0,this.currentclosed+this.items);
    this.currentclosed+=this.items;
  }



  

  showMessage(issue : Ticket){
    this.commentDisplay =true;
    this.viewIssueDetails={...issue};
    this.fileView(this.viewIssueDetails)
    
  }

  commentViewCancel(){
    this.commentDisplay =false;
    this.viewIssueDetails={};
    this.text='';
    
  }
  onSaveComment(viewIssueDetails : Ticket){

    // Plain text---------------------------->
    let plainText=''
    const div = document.createElement('div');
    div.innerHTML = this.text;
    plainText = div.textContent || div.innerText || '';
 
    if(plainText === '' || plainText.trim().length === 0) {
      this.messageEmpty();
    } 
   
    else{
    //Adding comment-------------------------------->
    viewIssueDetails.comment?.unshift({
      comment:plainText,
      commentedDate: this.date.getCurrentTime(),
      commenter:this.serverService.loggedUser[0].userName
    })
    this.serverService.onUpdate(''+viewIssueDetails.dataBaseId,viewIssueDetails).subscribe();

    this.text='';
        
  }
}

 

// Deletre Issue-------------------------------------------->
  onDeleteUser(user : User){
    const userNew = user;
  this.confirmationService.confirm({
    accept: ()=>{
      this.serverService.onDeleteUserIssue(""+user.dataBaseId).subscribe(()=>{
        this.deletedIssue(userNew);
        this.editDisplay=false;
      })
    },
    reject : ()=>{
      this.editDisplay=true;
    }
  })
  }

  onEdit(user : any){

    this.editUserData =user;

    (user.statusId === 'Closed')?this.isStatusClosed=true: null;
    ( user.statusId === 'Open')?this.isSatatusOpen=true: this.isSatatusOpen=false;
    

    // Toast message Checking-------------->
    this.checkePriority = user.priorityId;
    this. checkAssignee = user.assigneeId;
    this.checkStatus = user.statusId;

    

  this.priorityID = user.priorityId;
  this. assigneeID = user.assigneeId;
  this.statusID = user.statusId;
  this.lastModifiedDateTime = user.lastModifiedDateTime;
  this.editDisplay=true;
  
   
  }
  
  onUpdate(){
    

    this.editUserData.priorityId=this.priorityID;
    this.editUserData.assigneeId = this.assigneeID;
    this.editUserData.statusId = this.statusID;

    this.editUserData.lastModifiedDateTime = this.date.getCurrentTime();

   this.serverService.onUpdate(this.editUserData.dataBaseId, this.editUserData).subscribe( ()=>{ this.featchIssueData(); this.updateSuccess(); }) ? 
   null:this.notUpdate()

  // checking for toast message-------------------------->
   if(this.checkePriority !=   this.editUserData.priorityId )
    this.showIssue(this.editUserData,'Priority',this.checkePriority, this.editUserData.priorityId);
  else if(this.checkAssignee !=   this.editUserData.assigneeId) 
    this.showIssue(this.editUserData,'Assignee',this.checkAssignee, this.editUserData.assigneeId); 
  else if(this.checkStatus !=   this.editUserData.statusId)
    this.showIssue(this.editUserData,'Status',this.checkStatus ,this.editUserData.statusId);

  
  // Reset the all fields
   this.editDisplay=false;
   this.isStatusClosed = false;
   this.isSatatusOpen = false;
   
   this.editUserData='';

  }

  cancelTicket(){
    this.editDisplay=false;
    this.editUserData='';
    this.isStatusClosed = false;

  }

// Time Validation for 7 days--------------------------------------------------->
  getTimeDate(user :User){
    return (
      (new Date(`${this.date.getCurrentTime()}`).valueOf()) - 
      (new Date(`${user.lastModifiedDateTime}`).valueOf()) > 604800000) ?  true : false ;
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


//Toast window-------------------------------------->
showIssue(issue :any,state : string, from : string, to :string) {
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "Ticket ID : "+issue.ticketId +" and "+state+" changed from "+from+" to "+to+"....", life: 5000 });
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


// download File--------------------------------------------->

downloadImage(Issue : Ticket ) {

  if(Issue.imageData === '' || Issue.imageData === undefined)
  {
    this.noFile();
  }
  else{
  const base64Image = ''+Issue.imageData;
  const a = document.createElement('a');
  a.href = base64Image;
  a.download = 'image.png';
  a.click();
  }
}
  
// file view------------------------------------------>
fileView(issue : any){
  const base64Image = issue.imageData;
  const img = new Image();
  img.src = base64Image;
  img.onload = () => {
    document.querySelector('.image')?.appendChild(img);
  };

}

// Download ------------------------------------------->

noFile(){
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "File Doesn't Exist To Download.....", life: 3000 })
}

messageEmpty(){
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "Message Is Empty.....", life: 3000 })
}

updateSuccess(){
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "Updated Successfully.....", life: 3000 })
}
notUpdate(){
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "Not Update.....!", life: 3000 })
}
deletedIssue(user : User){
  this.messageService.add({ severity: 'info', summary: 'Info', 
    detail: "User ID : "+user.userId+" is deleted", life: 3000 })

}

}




