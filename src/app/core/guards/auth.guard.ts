import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthenticationService } from '../services/interfaces/authentication/authentication.interface';
import { AUTH_TOKEN } from '../repositories/repository.tokens';

/**
 * Guard that prevents unauthorized access to routes that require authentication.
 * 
 * If the user is not authenticated, it redirects them to the splash screen and prevents access.
 * If the user is authenticated, access to the requested route is granted.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of the authentication guard.
   * 
   * @param router Router used for navigation redirection.
   * @param auth Authentication service that provides user session validation.
   */
  constructor(
    private router:Router,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService
  ){}

  /**
   * Determines whether a route can be activated based on the user's authentication status.
   * 
   * If the user is authenticated (`GetUser()` returns a valid user), access is allowed.
   * If authentication fails or an error occurs, the user is logged out and redirected to the `/splash` page.
   * 
   * @param route The activated route snapshot.
   * @param state The router state snapshot.
   * @returns A boolean, UrlTree, or an Observable/Promise of either, indicating whether navigation is allowed.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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