import { Component } from '@angular/core';

interface Task {
  title : string,
  message : string,
  timeTo : any,
  timeFrom : any,
  eventDate : Date
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone : false
})
export class CalendarComponent {
date: Date =  new Date();
title : string = '';
eventDate : Date | undefined;
taskDate: Date | undefined;
isNewEvent : boolean = false;
timeFrom?: Date ;
timeTo?: Date ;
message : string ='';
task : Task[]=[];
time: Date[] | undefined;
daysCount = 0;
days : Date[] =[];

ngOnInit(){
  this.displayDateAndEvent();
  this.loadSideTime();
}
newEvent(){
  this.isNewEvent = true;
}
closeNewEvent(){
  this.isNewEvent = false;
}



onSaveEvent(){
  // this.displayDateAndEvent();
  console.log();
  if(
    this.timeFrom?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(6)== "PM" && 
    this.timeTo?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(6)== "AM"
  )
  {
    alert(" Add task within same day");
  }
  else if(this.eventDate! < new Date()){
    alert("Selected time is in the past");
  }
  else{
    
  this.task.push({
    title : this.title,
    timeFrom : this.timeFrom, 
    timeTo : this.timeTo,
    message : this.message, 
    eventDate : this.eventDate! })
    this.isNewEvent = false;
  }
    
  
}


onChangeDate(){
  this.displayDateAndEvent();
}

resetToToday() {
  this.date = new Date(); // Set the date to today's date
}


displayDateAndEvent(){

 this.days=[];
  
  this.daysCount =new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate();

  for(let i =1; i<=this.daysCount; i++){
    this.days.push(new Date(this.date.getFullYear(),this.date.getMonth(),i));
  }

}
getDayName(day: Date): string {
  const options: { weekday: 'long' } = { weekday: 'long' };
  return day.toLocaleDateString('en-US', options);  
}

getMonthName(day: Date): string {
  const options: { month: 'long' } = { month: 'long' };  
  return day.toLocaleDateString('en-US', options); 
}

getEventsForDay(day :Date){
  return this.task.filter((task)=>
    task.eventDate.getDate() === day.getDate() 
    && task.eventDate.getFullYear() === day.getFullYear()
    && task.eventDate.getMonth() === day.getMonth());
}

// time Loading
sideBarTime : any[] = [];
loadSideTime(){
  this.sideBarTime.push(12+ " AM");
    for(let i=1 ;i<12 ; i++){
      (i>=1 && i<=9)?
      this.sideBarTime.push("0"+i+ " AM"):
      this.sideBarTime.push(i+ " AM");
    }
    this.sideBarTime.push(12+ " PM");
    for(let i=1 ;i<12 ; i++){
      (i>=1 && i<=9)?
      this.sideBarTime.push("0"+i+ " PM"):
      this.sideBarTime.push(i+ " PM");
    }


    
}

diff :number =0;
getTime(event : Task,time : any){
 
  let timeFrom = event.timeFrom.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(0,2)+
            event.timeFrom.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(5)
  let timeTo = event.timeTo.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(0,2)+
                event.timeTo.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(5)

    
                
  if(Number(timeTo.slice(0,2) === 12 )){
    if(time.toString() === timeFrom || time.toString() === timeTo || (Math.abs(this.diff) > 1)){ 
      this.diff =Number(timeFrom.slice(0,2) )-Number(timeTo.slice(0,2) );
      if(time.toString() === timeTo)
        this.diff=0;
      return true;
    }

  }
  else if(Number(timeFrom.slice(0,2) === 12 )){
    if(time.toString() === timeFrom || time.toString() === timeTo || (Math.abs(this.diff) > 1)){ 
      this.diff =0-Number(timeTo.slice(0,2) );
      if(time.toString() === timeTo)
        this.diff=0;
      return true;
    }

  }

  else{
    if(time.toString() === timeFrom || time.toString() === timeTo || (Math.abs(this.diff) > 1)){ 
      this.diff =Number(timeTo.slice(0,2) )-Number(timeFrom.slice(0,2) );
      if(time.toString() === timeTo)
        this.diff=0;
      return true;
    }
  }
    
  
  return false;
  
}
}
