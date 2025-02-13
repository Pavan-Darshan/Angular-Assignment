import { Injectable } from "@angular/core";
import { LoginUser } from "../../Model/loginUser";

@Injectable({
    providedIn:"root"
})

export class LoginUserDetails{

    admin : LoginUser [] =[

        new LoginUser('101','Admin','admin@mail.com','1234'),

    ]

}