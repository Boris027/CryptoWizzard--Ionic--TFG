import { Injectable } from "@angular/core";
import { IAuthenticationMapping } from "../../interfaces/authentication/auth-mapping.interface";
import { LoginPayLoad, RegisterPayLoad } from "../../../models/auth.model";
import { User } from "../../../models/User.model";


export interface StrapiLoginResponse{
    jwt:string,
    user:StrapiUser
}

export interface StrapiRegisterResponse{
    jwt:string,
    user:StrapiUser
}

export interface StrapiUser{
    id:number,
    gender:string
    username:string,
    email:string,
    provider:string,
    confirm:boolean,
    blocked:boolean,
    createAt:string,
    updateAt:string 
}

export interface StrapiSignIn{
    identifier:string,
    password:string
}

export interface StrapiRegister{
    gender:string
    username:string,
    email:string,
    password:string
}



@Injectable({
    providedIn: 'root'
})


export class StrapiAuthMappingService implements IAuthenticationMapping{


    Login(payload: LoginPayLoad):StrapiSignIn {
        return {identifier:payload.email, password:payload.password}
    }
    Register(payload: RegisterPayLoad):StrapiRegister {
        return {username:payload.username,password:payload.password,email:payload.email,gender:payload.gender}
    }
    
    LoginResponse(response: StrapiLoginResponse):User {
        return {
            gender:response.user.gender,
            id:""+response.user.id,
            username:response.user.username,
            email:response.user.email,
            token:response.jwt,
            isAdmin:"false"
        }
    }
    RegisterResponse(response: StrapiLoginResponse):User {
        return {
            gender:response.user.gender,
            id:""+response.user.id,
            username:response.user.username,
            email:response.user.email,
            token:response.jwt,
            isAdmin:"false"
        }
    }

    GetUserResponse(response:StrapiUser,token:string):User{
        return {
            id:""+response.id,
            gender:response.gender,
            username:response.username,
            email:response.email,
            token:token,
            isAdmin:"false"
        }
    }
    
}