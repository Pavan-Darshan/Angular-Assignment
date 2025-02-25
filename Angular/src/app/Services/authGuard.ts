import { Router } from "@angular/router";
import { AuthService } from "./login/auth.service";
import { inject } from "@angular/core";

export const CanActivate = ()=>{

  const authService = inject(AuthService);
  const router = inject(Router);

    
    if(authService.isAuthenticated())
        return true;
    else
    {
      router.navigate(['/']);
        return false;
    }
}