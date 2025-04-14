import { LoginPayLoad, RegisterPayLoad } from "src/app/core/models/auth.model";
import { IAuthenticationMapping } from "../../interfaces/authentication/auth-mapping.interface";
import { User } from "src/app/core/models/User.model";

export interface LoginResponse {
    uid: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    providerData: providedata[]
    stsTokenManager: StsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string,
    accessToken:string,
    isAdmin:string
  }
  
  export interface providedata {
    providerId: string
    uid: string
    displayName: any
    email: string
    phoneNumber: any
    photoURL: any
  }
  
  export interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
  }
  


export class FirebaseAuthMappingService implements IAuthenticationMapping{
    
    Login(payload: LoginPayLoad):User {


        throw new Error("Method not implemented.");
    }
    Register(payload: RegisterPayLoad) {
        throw new Error("Method not implemented.");
    }
    LoginResponse(response: LoginResponse):User {
        console.log("response")
        console.log(response)
        return {
            id:response.uid,
            email:response.email,
            token:response.accessToken,
            username:"xd",
            gender:"male",
            isAdmin:response.isAdmin
        }
        throw new Error("Method not implemented.");
    }
    RegisterResponse(response: LoginResponse,name:string,gender:string) {
        return {
            id:response.uid,
            email:response.email,
            token:response.accessToken,
            username:name,
            gender:gender,
            isAdmin:false
        }
    }
    GetUserResponse(response: LoginResponse, token: string) {
        return {
            id:response.uid,
            email:response.email,
            token:response.accessToken,
            username:"xd",
            gender:"male",
            isAdmin:response.isAdmin
        }
        throw new Error("Method not implemented.");
    }
    
}