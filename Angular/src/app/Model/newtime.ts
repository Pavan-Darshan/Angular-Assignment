import { Injectable } from "@angular/core";


@Injectable({
    providedIn :'root'
})

export class NewTime{
     date  =  new Date();
      DateTime = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        }).format(this.date)
}
