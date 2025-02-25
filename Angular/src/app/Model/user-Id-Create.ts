
import { Injectable } from "@angular/core";

@Injectable({
    providedIn :'root'
})


export class UserUniqueId{

    generateUserId(): string {
        const date = new Date();
        const uniqueId = "UC"+ 
                         (date.getMonth() + 1).toString().padStart(2, '0') +
                         date.getDate().toString().padStart(2, '0') + 
                         date.getHours().toString().padStart(2, '0') + 
                         date.getMinutes().toString().padStart(2, '0') +
                         date.getSeconds().toString().padStart(2, '0'); 
      
        return uniqueId;
    }

}