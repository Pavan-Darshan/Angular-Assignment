import { Component, OnChanges, OnInit } from '@angular/core';
import { Ticket } from '../../../Model/Ticket';
import { ServerService } from '../../../Services/service/server.service';
import { map } from 'rxjs';
import { User } from '../../../Model/loginUser';
import { DateTime } from '../../../Model/DateTime';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';


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
    private serverService : ServerService, private date : DateTime, private messageService: MessageService){}
  
  

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

 

  groupIssuesByStatus() {
   
    this.groupedIssues.open = this.featchedIssueList.filter(issue => issue.statusId === 'Open');
    this.groupedIssues.inProgress = this.featchedIssueList.filter(issue => issue.statusId === 'InProgress');
    this.groupedIssues.waiting = this.featchedIssueList.filter(issue => issue.statusId === 'Waiting');
    this.groupedIssues.fixed = this.featchedIssueList.filter(issue => issue.statusId === 'Fixed');
    this.groupedIssues.closed = this.featchedIssueList.filter(issue => issue.statusId === 'Closed');
    
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
    console.log(plainText); 

   
    
    //Adding comment-------------------------------->
    viewIssueDetails.comment?.unshift({
      comment:plainText,
      commentedDate: this.date.getCurrentTime(),
      commenter:this.serverService.loggedUser[0].userName
    })
    this.serverService.onUpdate(''+viewIssueDetails.dataBaseId,viewIssueDetails);

    this.text='';
        
  }

 

// Deletre User-------------------------------------------->
  onDeleteUser(user : User){
    console.log(user.lastModifiedDateTime?.slice(0,11));
    let date =user.lastModifiedDateTime
     let d = new Date(`${date}`)
     console.log(d.valueOf())

    confirm('Do you want to delete ...?')?
            ((this.serverService.onDeleteUserIssue(""+user.dataBaseId).subscribe(()=>{})) ? 
            alert("User ID : "+user.userId+" is deleted"):alert("User ID : "+user.userId+" is not deleted"))
            :
            null
  }


  
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

   this.serverService.onUpdate(this.editUserData.dataBaseId, this.editUserData).subscribe( ()=> this.featchIssueData()) ? 
   null:alert("Not Updated...!")

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
  const base64Image = ''+Issue.imageData;
  const a = document.createElement('a');
  a.href = base64Image;
  a.download = 'image.png';
  a.click();
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
}




