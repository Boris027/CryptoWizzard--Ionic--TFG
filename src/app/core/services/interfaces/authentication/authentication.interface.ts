import { Observable } from "rxjs"
import { User } from "src/app/core/models/User.model"

export interface IAuthenticationService{
    Login(authenticationlogin:any):Observable<User>

    Logout():void

    Register(authenticationregister:any):Observable<User>

    Deleteuser(token: string,iduser:string): Observable<any> 
    
    GetUser():Observable<User>

    verificateUser():Observable<boolean>

    setmenu(val:boolean):void

    setToken(token:string):void

    deleteToken():void

    setCurrency(currency:string):string

    getCurrency():string

    getToken():string;

    setId(id:string):void

    removeId():void
    getId():string
}