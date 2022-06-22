import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../Constants';
import { Utils } from '../Utils';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  constructor(
    private router:Router
  ){

  }

  canActivate(){
    if(Utils.get(Constants.ACTUAL_USER)){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
    
  
}
