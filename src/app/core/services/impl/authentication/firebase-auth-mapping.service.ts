import { LoginPayLoad, RegisterPayLoad } from "src/app/core/models/auth.model";
import { IAuthenticationMapping } from "../../interfaces/authentication/auth-mapping.interface";
import { User } from "src/app/core/models/User.model";

/**
 * Interface representing the response returned from Firebase authentication login.
 */
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

/**
 * Interface representing the provider data associated with the user.
 */
export interface providedata {
    providerId: string
    uid: string
    displayName: any
    email: string
    phoneNumber: any
    photoURL: any
}

/**
 * Interface representing the Firebase security token manager info.
 */
export interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}

/**
 * Service that maps Firebase authentication payloads and responses to the app's User model.
 * 
 * Implements IAuthenticationMapping interface to convert between backend responses and frontend models.
 */
export class FirebaseAuthMappingService implements IAuthenticationMapping{
    /**
     * Maps a login payload to a User model.
     * Currently not implemented.
     * @param payload - Login data from frontend.
     * @throws Error
     */
    Login(payload: LoginPayLoad):User {
        throw new Error("Method not implemented.");
    }

    /**
     * Maps a registration payload to a User model.
     * Currently not implemented.
     * @param payload - Registration data from frontend.
     * @throws Error
     */
    Register(payload: RegisterPayLoad) {
        throw new Error("Method not implemented.");
    }

    /**
     * Maps a Firebase LoginResponse to a User model.
     * @param response - The Firebase login response object.
     * @returns User model populated with Firebase response data.
     */
    LoginResponse(response: LoginResponse):User {
        return {
            id:response.uid,
            email:response.email,
            token:response.accessToken,
            username:"xd",
            gender:"male",
            isAdmin:response.isAdmin
        }
    }

    /**
     * Maps a Firebase registration response to a User model.
     * @param response - The Firebase registration response.
     * @param name - User's username.
     * @param gender - User's gender.
     * @returns User model populated with Firebase response data and provided user info.
     */
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

    /**
     * Maps a Firebase user retrieval response to a User model.
     * @param response - The Firebase user response.
     * @param token - Authentication token (not currently used).
     * @returns User model populated with Firebase response data.
     */
    GetUserResponse(response: LoginResponse, token: string) {
        return {
            id:response.uid,
            email:response.email,
            token:response.accessToken,
            username:"xd",
            gender:"male",
            isAdmin:response.isAdmin
        }
    }
}