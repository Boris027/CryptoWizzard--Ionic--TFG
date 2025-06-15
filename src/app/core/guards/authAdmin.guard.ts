import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from "../repositories/repository.tokens";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "firebase/auth";
import { IUserbaseService } from "../services/interfaces/user/User-base-service.interface";

/**
 * Guard that restricts access to routes intended only for admin users.
 * 
 * It fetches the current user's profile using `userService` and checks the `isAdmin` flag.
 * If the user is not an admin, they are redirected to the `/splash` page.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  /**
   * Creates an instance of the admin guard.
   * 
   * @param router Angular router used for navigation redirection.
   * @param auth Authentication service used to manage the user's session.
   * @param userService Service that provides access to user profile data, including admin status.
   */
  constructor(
    private router: Router,
    @Inject(AUTH_TOKEN) private auth: IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserbaseService<User>,
  ) {}

  /**
   * Determines whether the route can be activated based on the user's admin privileges.
   * 
   * If the user has `isAdmin === true`, access is granted.
   * Otherwise, the user is redirected to the `/splash` route.
   * 
   * @param route The current activated route.
   * @param state The router state snapshot.
   * @returns A boolean, UrlTree, or Observable/Promise thereof indicating access permission.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.GetBasicUser().pipe(
      map((user) => {
        if (user.isAdmin === true) {
          return true;
        } else {
          this.router.navigate(['/splash']);
          return false;
        }
      }),
      catchError((err) => {
        this.auth.Logout();
        return of(true); // Optionally: could redirect or return false
      })
    );
  }
}