import { Component } from '@angular/core';
import { User } from '../../../../Model/loginUser';
import { Ticket } from '../../../../Model/Ticket';
import { map } from 'rxjs';
import { ServerService } from '../../../../Services/service/server.service';
import { DateTime } from '../../../../Model/DateTime';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

interface Priority {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  standalone: false,
})
export class UserDashboardComponent {
  constructor(
    private serverService: ServerService,
    private date: DateTime,
    private messageService: MessageService
  ) {}

  isFormActive: boolean = false;
  featchedIssueList: Ticket[] = [];
  selectedIssue: Ticket[] = [];
  filteredIssues: any[] = [];
  searchValue = '';
  loading: boolean = true;
  commentDisplay: boolean = false;
  viewIssueDetails?: any;
  text: string = '';
  editDisplay: boolean = false;
  editUserData: any;
  priorityID: string = '';
  assigneeID: string = '';
  statusID: string = '';
  lastModifiedDateTime: string = '';

  isStatusClosed: boolean = false;
  isSatatusOpen: boolean = false;

  filterUserName: string = '';
  filterRepoterId: string = '';
  filterAssigneeId: string = '';
  filterCategory: string = '';
  filterPriority: string = '';
  filterStatus: string = '';

  // checking for Toast message--------------->
  checkePriority: string = '';
  checkStatus: string = '';
  checkAssignee: string = '';

  categories = [
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Software', value: 'Software' },
    { label: 'Access Management', value: 'Access Management' },
  ];

  ngOnInit() {
    this.featchIssueData();
  }
  ngOnChanges() {
    this.featchIssueData();
  }

  onCreateTicket() {
    this.isFormActive = true;
  }

  onSaveTicket(value: boolean) {
    this.isFormActive = value;
    if (!value) this.featchIssueData();
  }

  // Featching issue List --------------------->
  featchIssueData() {
    this.serverService
      .featchIssueList()
      .pipe(
        map((response) => {
          let data: Ticket[] = [];

          for (let key in response) {
            if (response.hasOwnProperty(key))
              data.push({ ...response[key], dataBaseId: key });
          }
          return data;
        })
      )
      .subscribe((res) => {
        this.featchedIssueList = res;
        setTimeout(() => {
          this.loading = false;
        }, 2000);

        this.filteredIssues = [...this.featchedIssueList]; // copying data to filter in table list
        this.groupIssuesByStatus(); // type of status
      });
  }

  // splitting the issues status to array-------------->

  groupedIssues: any = {
    open: [],
    inProgress: [],
    waiting: [],
    fixed: [],
    closed: [],
  };

  open: any[] = [];
  inProgress: any[] = [];
  waiting: any[] = [];
  fixed: any[] = [];
  closed: any[] = [];

  groupIssuesByStatus() {
    this.open = this.featchedIssueList.filter(
      (issue) => issue.statusId === 'Open'
    );
    this.inProgress = this.featchedIssueList.filter(
      (issue) => issue.statusId === 'InProgress'
    );
    this.waiting = this.featchedIssueList.filter(
      (issue) => issue.statusId === 'Waiting'
    );
    this.fixed = this.featchedIssueList.filter(
      (issue) => issue.statusId === 'Fixed'
    );
    this.closed = this.featchedIssueList.filter(
      (issue) => issue.statusId === 'Closed'
    );

    this.loadOpen();
    this.loadinProgress();
    this.loadwaiting();
    this.loadfixed();
    this.loadclosed();
  }

  currentOpen = 0;
  itemsPerOpen = 5;
  loadOpen() {
    this.groupedIssues.open = this.open.slice(
      0,
      this.currentOpen + this.itemsPerOpen
    );
    this.currentOpen += this.itemsPerOpen;
  }

  currentinProgress = 0;
  itemsPerinProgress = 5;
  loadinProgress() {
    this.groupedIssues.inProgress = this.inProgress.slice(
      0,
      this.currentinProgress + this.itemsPerinProgress
    );
    this.currentinProgress += this.itemsPerinProgress;
  }
  currentwaiting = 0;
  itemsPerwaiting = 5;
  loadwaiting() {
    this.groupedIssues.waiting = this.waiting.slice(
      0,
      this.currentwaiting + this.itemsPerwaiting
    );
    this.currentOpen += this.itemsPerwaiting;
  }
  currentfixed = 0;
  itemsPerfixed = 5;
  loadfixed() {
    this.groupedIssues.fixed = this.fixed.slice(
      0,
      this.currentfixed + this.itemsPerfixed
    );
    this.currentfixed += this.itemsPerfixed;
  }
  currentclosed = 0;
  itemsPerclosed = 5;
  loadclosed() {
    this.groupedIssues.closed = this.closed.slice(
      0,
      this.currentclosed + this.itemsPerclosed
    );
    this.currentclosed += this.itemsPerclosed;
  }

  showMessage(issue: Ticket) {
    this.commentDisplay = true;
    this.viewIssueDetails = { ...issue };
    this.fileView(this.viewIssueDetails);
  }

  commentViewCancel() {
    this.commentDisplay = false;
    this.viewIssueDetails = {};
    this.text = '';
  }
  onSaveComment(viewIssueDetails: Ticket) {
    // Plain text---------------------------->
    let plainText = '';
    const div = document.createElement('div');
    div.innerHTML = this.text;
    plainText = div.textContent || div.innerText || '';
    
    if(plainText === '' || plainText.trim().length === 0) {
      alert("Message is empty...!");
    } 

    else{
    //Adding comment-------------------------------->
    viewIssueDetails.comment?.unshift({
      comment: plainText,
      commentedDate: this.date.getCurrentTime(),
      commenter: this.serverService.loggedUser[0].userName,
    });
    this.serverService.onUpdate(
      '' + viewIssueDetails.dataBaseId,
      viewIssueDetails
    ).subscribe();
    this.text = '';
   }
  }

  Priority: Priority[] = [
    { name: 'Low', code: 'Low' },
    { name: 'MEDIUM', code: 'MEDIUM' },
    { name: 'HIGH', code: 'HIGH' },
    { name: 'CRITICAL', code: 'CRITICAL' },
  ];

  Assignee: any[] = [
    { name: 'Admin-Pavan', id: '101' },
    { name: 'Admin-Darshan', id: '102' },
  ];

  Status: any[] = [
    { label: 'Open', id: 'Open' },
    { label: 'InProgress', id: 'InProgress' },
    { label: 'Waiting', id: 'Waiting' },
    { label: 'Fixed', id: 'Fixed' },
    { label: 'Closed', id: 'Closed' },
  ];

  // Comment window is opened ------------------------------------->
  onEdit(user: any) {
    this.editUserData = user;
    this.priorityID = user.priorityId;
    this.assigneeID = user.assigneeId;
    this.statusID = user.statusId;
    this.lastModifiedDateTime = user.lastModifiedDateTime;
    this.editDisplay = true;
  }

  // Adding comments by clicking submit button---------------------->
  onUpdate() {
    this.editUserData.priorityId = this.priorityID;
    this.editUserData.assigneeId = this.assigneeID;
    this.editUserData.statusId = this.statusID;
    this.editUserData.lastModifiedDateTime = this.date.getCurrentTime();
    //server
    this.serverService.onUpdate(this.editUserData.dataBaseId, this.editUserData)
      ? alert('Updated Successfully...')
      : alert('Not Updated...!');
    this.editDisplay = false;
    this.editUserData = '';
    this.featchIssueData();
  }
  // Cancel Ticket ------------------------------------------------------------>
  cancelTicket() {
    this.editDisplay = false;
    this.editUserData = '';
  }

  // Time Validation for 7 days--------------------------------------------------->
  getTimeDate(user: User) {
    let currentTime = this.date.getCurrentTime();
    const newDate =
      new Date(`${currentTime}`).valueOf() -
      new Date(`${user.lastModifiedDateTime}`).valueOf();

    if (newDate >= 604800) {
      return true;
    }
    return false;
  }

  // Clear filter --------------------------------------------->
  clearFilter() {
    this.searchValue = '';
    this.filteredIssues = [...this.featchedIssueList];
  }

  // filter for  list of issues in table----------------------------------------->
  searchIssue() {
    if (this.searchValue) {
      this.filteredIssues = this.featchedIssueList.filter(
        (issue) =>
          issue.userName
            ?.toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.reportedId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.categoryId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.subCategoryId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.subject
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.description
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.statusId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.priorityId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.createDateTime
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.lastModifiedDateTime
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          issue.assigneeId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
      );
    } else {
      this.filteredIssues = [...this.featchedIssueList];
    }
  }

  // Search filter by dropdown
  filterApply(data: NgForm) {
    this.filteredIssues = this.filteredIssues.filter(
      (issue) =>
        (data.value.filterUserName
          ? issue.userName?.toLowerCase().trim() ===
            data.value.filterUserName.toLowerCase().trim()
          : true) &&
        (data.value.filterRepoterId
          ? issue.reportedId.toLowerCase().trim() ===
            data.value.filterRepoterId.toLowerCase().trim()
          : true) &&
        (data.value.filterAssigneeId
          ? issue.assigneeId.toLowerCase().trim() ===
            data.value.filterAssigneeId.toLowerCase().trim()
          : true) &&
        (data.value.filterCategory
          ? issue.categoryId.toLowerCase().trim() ===
            data.value.filterCategory.toLowerCase().trim()
          : true) &&
        (data.value.filterPriority
          ? issue.priorityId.toLowerCase().trim() ===
            data.value.filterPriority.toLowerCase().trim()
          : true) &&
        (data.value.filterStatus
          ? issue.statusId.toLowerCase().trim() ===
            data.value.filterStatus.toLowerCase().trim()
          : true)
    );
    data.reset();
  }

  // Search filter Reset by dropdown
  resetFilter() {
    this.filteredIssues = this.featchedIssueList;
  }

  // download File--------------------------------------------->

  downloadImage(Issue: Ticket) {
    const base64Image = '' + Issue.imageData;
    const a = document.createElement('a');
    a.href = base64Image;
    a.download = 'image.png';
    a.click();
  }

  // file view------------------------------------------>
  fileView(issue: any) {
    const base64Image = issue.imageData;
    const img = new Image();
    img.src = base64Image;
    img.onload = () => {
      document.querySelector('.image')?.appendChild(img);
    };
  }
}
