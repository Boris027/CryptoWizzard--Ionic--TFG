import { Inject, Injectable } from '@angular/core';
import { BaseAutenticationService } from './base-autentication.service';
import { IStrapiAuthentication } from '../../interfaces/authentication/strapi-authentication.interface';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, USER_API_URL_TOKEN } from '../../../repositories/repository.tokens';
import { HttpClient } from '@angular/common/http';
import { IAuthenticationMapping } from '../../interfaces/authentication/auth-mapping.interface';
import { StrapiLoginResponse, StrapiUser } from './strapi-auth-mapping.service';
import { User } from 'src/app/core/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class StrapiAutenticationService extends BaseAutenticationService implements IStrapiAuthentication {
  
  
  
  
  

  constructor(
    private httpclient:HttpClient,
    @Inject(USER_API_URL_TOKEN) private userapiurltoken:string,
    @Inject(LOGIN_API_URL_TOKEN) private loginapitoken:string,
    @Inject(REGISTER_API_URL_TOKEN) private registertoken:string,
    @Inject(AUTENTICATION_URL_TOKEN) private authenticationurltoken:string,
    @Inject(AUTH_MAPPING_TOKEN) private mapping:IAuthenticationMapping
  ) {
    super();
  }

  override Deleteuser(token: string, iduser: string): Observable<any> {
    return this.httpclient.delete(this.userapiurltoken+`users/${iduser}`,{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }).pipe(
      map((c)=>{
        this.deleteToken()
        this.removeId()
      })
    )
  }

  override Login(authenticationlogin: any): Observable<User> {
    return this.httpclient.post<StrapiLoginResponse>(this.loginapitoken,this.mapping.Login(authenticationlogin)).pipe(map((resp:StrapiLoginResponse)=>{
      localStorage.setItem("token",resp.jwt);
      localStorage.setItem("uid",""+resp.user.id)
      return this.mapping.LoginResponse(resp);
    }),
    catchError((err:any)=>{
      let error12=err.error.error.message+"";
      return throwError(()=>error12)
    })
  );
  }

  override Register(authenticationregister:any): Observable<any> {
    return this.httpclient.post<StrapiLoginResponse>(this.registertoken,this.mapping.Register(authenticationregister)).pipe(map((resp:StrapiLoginResponse)=>{
      localStorage.setItem("token",resp.jwt);
      localStorage.setItem("uid",""+resp.user.id)
      return this.mapping.RegisterResponse(resp);
    }),
    catchError((err:any)=>{
      return throwError(()=>err.error.error.message+"")
    })
    );
  }

  override GetUser(): Observable<any> {
    return this.httpclient.get<StrapiUser>(this.authenticationurltoken,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}).pipe(map((resp:StrapiUser)=>{
      return this.mapping.GetUserResponse(resp,localStorage.getItem("token")!!)
    }))
  }
  
 
  

  
  
}
