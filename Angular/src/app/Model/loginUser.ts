export interface User{
    userName : string;
    userId : string;
    emailAddress : string;
    password :string;
    createdDateTime ?:string;
    lastModifiedDateTime ?:string;
    dataBaseId ?:string;


  userType : string ;
  userPhone ?: number ;
 
  createdSource : string;
  createdSourceType : string;
  createdSourceDate : string ;
  modifiedSource : string ;
  modifiedSourceType : string;
  modifiedSourceDate : string ;
  checked : boolean ;

  address : string ;
  state : string ;
  country : string;
  userState : string ;
  city : string ;
  postalCode ?: number;
  locale : string ;
  timeZone : string ;

   
}