import { LoginPayLoad, RegisterPayLoad } from "../../../models/auth.model"

export interface IAuthenticationMapping{
    Login(payload:LoginPayLoad):any
    Register(payload:RegisterPayLoad):any
    LoginResponse(response:any):any
    RegisterResponse(response:any,name?:string,gender?:string):any
    GetUserResponse(response:any,token:string):any
}