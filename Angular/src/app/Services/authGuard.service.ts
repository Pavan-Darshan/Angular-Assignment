import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./login/auth.service";

@Injectable({
    providedIn :'root'
})

export class AuthGuardService implements CanActivate{

    constructor(private authService : AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
    {
        if(this.authService.isAuthenticated())
            return true;
        else
        {
            this.router.navigate(['/']);
            return false;
        }
    }
}