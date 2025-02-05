export class LoginUser{
    userName : string;
    userId : string;
    emailAddress : string;
    password :string;

    constructor(id : string, name :string, email : string, password : string ){
        this.userId = id;
        this.userName =name;
        this.emailAddress = email;
        this.password = password;
    }
}