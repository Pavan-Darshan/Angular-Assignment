import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';  // For ngModel
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../Model/Ticket';
import { ServerService } from '../../Services/service/server.service';
import { map } from 'rxjs';
import { DateTime } from '../../Model/DateTime';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone :false,
  providers: [ButtonModule,DropdownModule,FormsModule,CommonModule]
})
export class UserComponent implements OnInit {
  

  constructor(private serverService : ServerService, private date : DateTime){}

  isFormActive :boolean = false;
  featchedIssueList :Ticket []=[];
  selectedIssue : Ticket []=[];

  searchValue =''
  loading:boolean= true;
  commentDisplay : boolean =false;
  viewIssueDetails ?:any;
  text :string=''

  ngOnInit(){
    this.featchIssueData ();
   
  }




  onCreateTicket(){
    this.isFormActive = true;}

  onSaveTicket(value : boolean){
    this.isFormActive = value;
    if(!value)
      this.featchIssueData();
  }
  

  // Featching issue List 
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
       
        console.log(this.featchedIssueList);

        this.groupIssuesByStatus(); // type of status
    })

  }


  // splitting the issues status to array

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
    viewIssueDetails.comment?.push({
      comment:plainText,
      commentedDate:this.date.getCurrentTime(),
      commenter:this.serverService.loggedUser[0].userName
    })

    this.serverService.onUpdate(''+viewIssueDetails.dataBaseId,viewIssueDetails);

      //Reset
    this.commentDisplay =false;
    this.viewIssueDetails={};
    this.text='';
        
  }


  isPopupVisible: boolean = false;
  popupPosition = { top: 0, left: 0 };

  openPopup(event: MouseEvent) { 
    if (this.isPopupVisible) {
    this.isPopupVisible = false;  
  } else {
    this.popupPosition.top = event.clientY-225;
    this.popupPosition.left = event.clientX+25;
    this.isPopupVisible = true;  
  }
  }
  
 
}
