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
    /**
     * Maps the login payload from the application to the Strapi sign-in format.
     * @param payload - The login payload containing email and password.
     * @returns The StrapiSignIn object with identifier and password.
     */
    Login(payload: LoginPayLoad):StrapiSignIn {
        return {identifier:payload.email, password:payload.password}
    }
    /**
     * Maps the registration payload from the application to the Strapi register format.
     * @param payload - The registration payload containing username, password, email, and gender.
     * @returns The StrapiRegister object for user registration.
     */
    Register(payload: RegisterPayLoad):StrapiRegister {
        return {username:payload.username,password:payload.password,email:payload.email,gender:payload.gender}
    }
    
    /**
     * Converts the Strapi login response into a User model used by the application.
     * @param response - The Strapi login response containing JWT and user details.
     * @returns A User object mapped from the Strapi response.
     */
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
    
    /**
     * Converts the Strapi register response into a User model used by the application.
     * @param response - The Strapi register response containing JWT and user details.
     * @returns A User object mapped from the Strapi response.
     */
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

    /**
     * Maps a Strapi user response and token to the application User model.
     * @param response - The Strapi user object.
     * @param token - The JWT token string.
     * @returns A User object constructed from the Strapi user data and token.
     */
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