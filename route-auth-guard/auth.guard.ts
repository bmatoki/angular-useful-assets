import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService:AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get token function is a getter function with localStorage.getItem('access_token');
    if (this.authService.getToken) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}