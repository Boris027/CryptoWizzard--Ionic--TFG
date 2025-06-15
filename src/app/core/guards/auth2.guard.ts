import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AUTH_TOKEN } from "../repositories/repository.tokens";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { catchError, map, Observable, of } from "rxjs";

/**
 * Guard that prevents authenticated users from accessing public routes such as login or registration.
 * 
 * If a user is already authenticated, they are redirected to the `/home` route.
 * If not authenticated, access to the requested public route is allowed.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard2 implements CanActivate {

  /**
   * Creates an instance of the guard.
   * 
   * @param router Router instance used for navigation and redirection.
   * @param auth Authentication service used to validate the current user session.
   */
  constructor(
    private router: Router,
    @Inject(AUTH_TOKEN) private auth: IAuthenticationService
  ) {}

  /**
   * Determines whether a route can be activated.
   * 
   * Prevents access to public routes (e.g., login or register) if the user is already authenticated.
   * 
   * @param route The current route snapshot.
   * @param state The current router state snapshot.
   * @returns `true` if the user is unauthenticated (allowing access),
   *          or a `UrlTree` redirecting to `/home` if the user is authenticated.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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