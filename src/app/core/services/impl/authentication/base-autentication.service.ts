import { Injectable } from '@angular/core';
import { IAuthenticationService } from '../../interfaces/authentication/authentication.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/models/User.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Abstract base class implementing common authentication logic.
 * 
 * This class implements IAuthenticationService interface and provides
 * utility methods for token, user ID, currency management using localStorage,
 * as well as managing the authentication state via a BehaviorSubject.
 * 
 * Concrete subclasses must implement the abstract methods for Register, Login,
 * GetUser, and Deleteuser to provide backend-specific behavior.
 */
export abstract class BaseAutenticationService implements IAuthenticationService {
  constructor() { }
  
  /* Observable to track the current authentication status (true = authenticated) */
  public authenticated:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false)

  /**
   * Registers a new user.
   * Must be implemented by subclasses.
   * @param authenticationregister - The registration payload.
   * @returns Observable emitting the registered User.
   */
  abstract Register(authenticationregister: any): Observable<User>

  /**
   * Logs in a user.
   * Must be implemented by subclasses.
   * @param authenticationlogin - The login payload.
   * @returns Observable emitting the logged-in User.
   */
  abstract Login(authenticationlogin: any): Observable<User>

  /**
   * Retrieves the currently authenticated user.
   * Must be implemented by subclasses.
   * @returns Observable emitting the current User.
   */
  abstract GetUser(): Observable<User> 

  /**
   * Deletes a user by ID, requires authorization token.
   * Must be implemented by subclasses.
   * @param token - Authorization token.
   * @param iduser - ID of the user to delete.
   * @returns Observable emitting the deletion result.
   */
  abstract Deleteuser(token: string,iduser:string): Observable<any> 
  
  /**
   * Logs out the current user.
   * Clears authentication status, token and user ID from storage.
   */
  Logout():void {
    this.setmenu(false)
    this.deleteToken()
    this.removeId()
  } 

  /**
   * Saves the authentication token in localStorage.
   * @param token - JWT or similar token.
   */
  setToken(token:string): void {
    localStorage.setItem("token",token);
  }

  /**
   * Removes the authentication token from localStorage.
   */
  deleteToken(): void {
    localStorage.removeItem("token")
  }

  /**
   * Saves the current user's ID in localStorage.
   * @param id - User identifier.
   */
  setId(id:string): void {
    localStorage.setItem("uid",id);
  }

  /**
   * Removes the user ID from localStorage.
   */
  removeId(): void {
    localStorage.removeItem("uid");
  }

  /**
   * Retrieves the current user ID from localStorage.
   * @returns The stored user ID or empty string if not found.
   */
  getId():string{
    return localStorage.getItem("uid")??"";
  }

  /**
   * Updates the authentication state observable.
   * @param val - True if authenticated, false otherwise.
   */
  setmenu(val:boolean){
    this.authenticated.next(val)
  }

  /**
   * Saves the preferred currency in localStorage.
   * @param currency - Currency code (e.g. "usd").
   * @returns The saved currency.
   */
  setCurrency(currency: string): string {
    localStorage.setItem("currency",currency)
    return currency
  }

  /**
   * Retrieves the preferred currency from localStorage.
   * @returns The saved currency or defaults to "usd" if not set.
   */
  getCurrency(): string {
    return localStorage.getItem("currency")??"usd"
  }

  /**
   * Returns an observable to monitor authentication state changes.
   * @returns Observable emitting true/false authentication status.
   */
  verificateUser(): Observable<boolean> {
    return this.authenticated
  }

  /**
   * Retrieves the stored authentication token.
   * @returns The token string or empty string if none stored.
   */
  getToken(): string {
    return localStorage.getItem("token")??"";
  }
}