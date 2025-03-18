import { Injectable } from '@angular/core';
import { ServerService } from './service/server.service';
import { SharedService } from './shared.service';
import { Ticket } from '../Model/Ticket';
import { User } from '../Model/loginUser';


@Injectable({
  providedIn: 'root'
})
export class ServiceNotification {

    


loggedUser?: User;
receivedData: Ticket []=[];
currentCount :number =0;
differenceCount : number =0;
notificationData : Ticket [] = [];

constructor(private serverService: ServerService, private sharedService: SharedService ){ }

// notification
notification(){

    
    this.loggedUser=this.serverService.loggedUser[0];
    this.sharedService.currentData.subscribe(data => {
      this.receivedData = data;
    
    if (this.loggedUser?.notification < this.receivedData?.length) {
      this.currentCount=this.receivedData.length;
      this.differenceCount=this.receivedData.length-this.loggedUser?.notification;
      this.notificationData = this.receivedData.reverse().slice(0,this.differenceCount);
      this.receivedData=[]

    }
    
  });
  }
  
}