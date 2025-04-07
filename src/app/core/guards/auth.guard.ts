import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/User.model';
import { IAuthenticationService } from '../services/interfaces/authentication/authentication.interface';
import { AUTH_TOKEN } from '../repositories/repository.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    //este guard sirve para si una persona que no tiene usuario y token interno intenta acceder al home o cualquier ventana que no sea el login y register
    /*this.auth.GetUser().subscribe({
      next:(value)=>{
          
      },
      error:(err)=>{
        this.auth.Logout()
        this.router.navigate(['/splash'])
      },
    })*/

    return this.auth.GetUser().pipe(
      map((user) => {
        if (user) {
        }
        return true;
      }),
      catchError((err) => {
        this.auth.Logout();
        this.router.navigate(['/splash'])

        return of(false); 

      })

    );
    
  }
}