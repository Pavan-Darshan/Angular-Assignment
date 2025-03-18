import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';



interface Task {
  title : string,
  message : string,
  starts : any,
  ends : any,
  date : any
}
@Component({
  selector: 'app-task-management',
  standalone : false,
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {


  title : string = '';
  date : any;
  taskDate: Date | undefined;
  isNewEvent : boolean = false;
  start?: Date ;
  end?: Date ;
  message : string ='';
  task : Task[] = [];
  calendarOptions ?: CalendarOptions;
  day ?: Date = new Date();



  ngOnInit(){
    this.calendarUpdate();
   
  }

  calendarUpdate(){
    this.calendarOptions= {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true, 
      editable: true,   
      droppable: true, 
      eventClick: this.handleEventClick,
      dateClick: (arg) => this.handleDateClick(arg),
      events: this.task
    };
  }

  
  handleEventClick(info: any) {
  

  }

  handleDateClick(arg : any) {

  }

// open event window----------------------------->
  newEvent(){
    this.isNewEvent = true;
  }
  // Close event window----------------------------->
  closeNewEvent(){
    this.isNewEvent = false;
  }

  onSaveEvent(){
   
    let newDate =''
    // making month as two digit --------------------------------------------->
    this.calendarOptions={};
      (((this.date!).getMonth()+1) >= 1 && ((this.date!).getMonth()+1) <=9 ) ?
      newDate =(this.date!).getFullYear()+"-0"+((this.date!).getMonth()+1)+"-"+(this.date!).getDate() :
      newDate = (this.date!).getFullYear()+"-"+((this.date!).getMonth()+1)+"-"+(this.date!).getDate();


    // Adding task to tassk array---------------------------------------------->
    this.task.push({
      starts: this.start?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
      ends :  this.end?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date : newDate,
      title : this.title,
      message : this.message })
      this.isNewEvent = false;
      setTimeout(()=>{
        this.calendarUpdate();
      },1000)
  }

 
  
}
