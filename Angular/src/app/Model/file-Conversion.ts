import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})


export class FileConversion{

imageKey : string ='';
imageName : string='';

    convert_File_To_Json(file : any){

       

            
                this.imageName=file.result as string;
    

             setInterval(()=>{
                console.log("json......."+this.imageName);
             },3000)
                
    }
}