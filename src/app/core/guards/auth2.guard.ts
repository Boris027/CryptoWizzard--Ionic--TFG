import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AUTH_TOKEN } from "../repositories/repository.tokens";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard2 implements CanActivate {
  
    constructor(
      private router:Router,
      @Inject(AUTH_TOKEN) private auth:IAuthenticationService
    ){}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
  
      //este guard sirve para si una persona que tiene usuario y token interno intenta acceder al login o register
      return this.auth.GetUser().pipe(
        map((user) => {
          if (user) {
            return this.router.createUrlTree(['/home']);
          }
          return true;
        }),
        catchError((err) => {
          this.auth.Logout();
          
          return of(true); 

        })

      );


    }
  }