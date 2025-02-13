export class LoginUser{
    userName : string;
    userId : string;
    emailAddress : string;
    password :string;
    createdDateTime ?:string;
    lastModifiedDateTime ?:string;
    dataBaseId ?:string;

    constructor(id : string, name :string, email : string, password : string,createdDateTime :string, lastModifiedDateTime :string, dataBaseId :string ){
        this.userId = id;
        this.userName =name;
        this.emailAddress = email;
        this.password = password;
        this.createdDateTime =createdDateTime;
        this.lastModifiedDateTime =lastModifiedDateTime;
        this.dataBaseId = dataBaseId;
    }
}