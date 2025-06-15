import { LoginPayLoad, RegisterPayLoad } from "../../../models/auth.model"

/**
 * Interface defining the contract for authentication data mapping
 * between the app's authentication payloads/responses and backend formats.
 */
export interface IAuthenticationMapping{
    /**
     * Maps the app's login payload to the backend login request format.
     * 
     * @param payload - Login data including email and password.
     * @returns Backend-specific login request object.
     */
    Login(payload:LoginPayLoad):any

    /**
     * Maps the app's register payload to the backend registration request format.
     * 
     * @param payload - Registration data including username, email, password, etc.
     * @returns Backend-specific registration request object.
     */
    Register(payload:RegisterPayLoad):any

    /**
     * Maps the backend login response to the app's user model.
     * 
     * @param response - Raw response from backend login API.
     * @returns Mapped user object for the app.
     */
    LoginResponse(response:any):any

    /**
     * Maps the backend registration response to the app's user model.
     * Optionally takes name and gender for additional processing.
     * 
     * @param response - Raw response from backend registration API.
     * @param name - Optional user name.
     * @param gender - Optional user gender.
     * @returns Mapped user object for the app.
     */
    RegisterResponse(response:any,name?:string,gender?:string):any

    /**
     * Maps the backend user response to the app's user model,
     * including the authentication token.
     * 
     * @param response - Raw user data from backend.
     * @param token - Authentication token string.
     * @returns Mapped user object for the app.
     */
    GetUserResponse(response:any,token:string):any
}