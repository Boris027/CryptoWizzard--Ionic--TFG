import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AUTH_TOKEN, USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from "../repositories/repository.tokens";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { catchError, map, Observable, of } from "rxjs";
import { IUserbaseRepositoy } from "../repositories/interfaces/user/User-base.interface";
import { BasicUser } from "../models/User.model";
import { User } from "firebase/auth";
import { IUserbaseService } from "../services/interfaces/user/User-base-service.interface";

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuardAdmin implements CanActivate {
  
    constructor(
      private router:Router,
      @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
      @Inject(USER_SERVICE_TOKEN) private userService:IUserbaseService<User>,
    ){}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
  
      //este guard sirve para si una persona que tiene usuario y token interno intenta acceder al login o register
      return this.userService.GetBasicUser().pipe(
        map((user) => {
            console.log(user)
          if (user.isAdmin==true) {
            return true;
            }else{
                this.router.navigate(['/splash'])
                return false;
            }
        }),
        catchError((err) => {
          this.auth.Logout();
          
          return of(true); 

        })

      );


    }
  }