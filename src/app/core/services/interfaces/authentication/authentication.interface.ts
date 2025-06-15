import { Observable } from "rxjs"
import { User } from "src/app/core/models/User.model"

/**
 * Interface defining the contract for authentication service operations.
 */
export interface IAuthenticationService{
    /**
     * Performs user login with given credentials.
     * 
     * @param authenticationlogin - Login data object.
     * @returns Observable emitting the authenticated User.
     */
    Login(authenticationlogin:any):Observable<User>

    /**
     * Logs out the current user.
     */
    Logout():void

    /**
     * Registers a new user with given registration data.
     * 
     * @param authenticationregister - Registration data object.
     * @returns Observable emitting the registered User.
     */
    Register(authenticationregister:any):Observable<User>

    /**
     * Deletes a user by ID with provided authentication token.
     * 
     * @param token - Authentication token.
     * @param iduser - ID of the user to delete.
     * @returns Observable emitting any server response.
     */
    Deleteuser(token: string,iduser:string): Observable<any> 

    /**
     * Retrieves the current authenticated user.
     * 
     * @returns Observable emitting the User.
     */
    GetUser():Observable<User>

    /**
     * Verifies if the user session is valid.
     * 
     * @returns Observable emitting a boolean indicating validity.
     */
    verificateUser():Observable<boolean>

    /**
     * Sets the menu visibility or state.
     * 
     * @param val - Boolean value to set menu state.
     */
    setmenu(val:boolean):void

    /**
     * Stores the authentication token.
     * 
     * @param token - Authentication token string.
     */
    setToken(token:string):void

    /**
     * Deletes the stored authentication token.
     */
    deleteToken():void

    /**
     * Sets the preferred currency.
     * 
     * @param currency - Currency code string.
     * @returns The set currency string.
     */
    setCurrency(currency:string):string

    /**
     * Retrieves the preferred currency.
     * 
     * @returns The currency code string.
     */
    getCurrency():string

    /**
     * Retrieves the stored authentication token.
     * 
     * @returns The token string.
     */
    getToken():string;

    /**
     * Stores the user ID.
     * 
     * @param id - User ID string.
     */
    setId(id:string):void

    /**
     * Removes the stored user ID.
     */
    removeId():void

    /**
     * Retrieves the stored user ID.
     * 
     * @returns The user ID string.
     */
    getId():string
}