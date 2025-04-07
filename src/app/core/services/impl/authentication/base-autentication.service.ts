import { Injectable } from '@angular/core';
import { IAuthenticationService } from '../../interfaces/authentication/authentication.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/models/User.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseAutenticationService implements IAuthenticationService {

  constructor() { }
  
  
  
  public authenticated:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false)

  
  abstract Register(authenticationregister: any): Observable<User> 
  abstract Login(authenticationlogin: any): Observable<User> 
  abstract GetUser(): Observable<User> 
  abstract Deleteuser(token: string,iduser:string): Observable<any> 
  
  Logout():void {
    this.setmenu(false)
    this.deleteToken()
    this.removeId()
  } 

   setToken(token:string): void {
    localStorage.setItem("token",token);
  }
   deleteToken(): void {
    localStorage.removeItem("token")
  }

  setId(id:string): void {
    localStorage.setItem("uid",id);
  }

  removeId(): void {
    localStorage.removeItem("uid");
  }

  getId():string{
    return localStorage.getItem("uid")??"";
  }

  setmenu(val:boolean){
    this.authenticated.next(val)
  }

  setCurrency(currency: string): string {
    localStorage.setItem("currency",currency)
    return currency
  }
  getCurrency(): string {
    return localStorage.getItem("currency")??"usd"
  }

   verificateUser(): Observable<boolean> {
    return this.authenticated
  }

  getToken(): string {
    return localStorage.getItem("token")??"";
  }
   

  
  
}
