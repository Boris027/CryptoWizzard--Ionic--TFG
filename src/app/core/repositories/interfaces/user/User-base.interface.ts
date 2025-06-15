import { Observable } from "rxjs"
import { BasicCrypto } from "src/app/core/models/Crypto.model"
import { BasicList } from "src/app/core/models/CryptoList.model"

/**
 * Interface defining the user-related repository methods
 * for managing user data, favorite lists, and cryptos.
 * 
 * @template T The type of User model.
 */
export interface IUserbaseRepositoy<T>{
    /**
     * Retrieves basic user information by ID.
     * @param token Authorization token.
     * @param id User ID.
     * @returns Observable with user data.
     */
    GetBasicUser(token:string,id:string):Observable<any>

    /**
     * Gets the favorite crypto lists of a user.
     * @param token Authorization token.
     * @param id Optional user ID.
     * @returns Observable with list data.
     */
    GetListFromUser(token:string,id?:string):Observable<any>

    /**
     * Adds a new favorite list to a user.
     * @param token Authorization token.
     * @param list The list to add.
     * @param iduser User ID to associate with the list.
     * @returns Observable with the operation result.
     */
    addlistToUser(token:string,list:BasicList,iduser:string):Observable<any>

    /**
     * Removes a favorite list by its ID.
     * @param token Authorization token.
     * @param listid ID of the list to remove.
     * @returns Observable with the operation result.
     */
    removelistFromUser(token:string,listid:string):Observable<any>,

    /**
     * Updates a user's favorite list.
     * @param token Authorization token.
     * @param list The list with updated data.
     * @returns Observable with the operation result.
     */
    updatelistFromUser(token:string,list:BasicList):Observable<any>

    /**
     * Adds a crypto to a user's favorite list.
     * @param token Authorization token.
     * @param idlist ID of the favorite list.
     * @param idcrypto ID of the crypto to add.
     * @param crypto Optional crypto object to add.
     * @returns Observable with the operation result.
     */
    addCryptoToList(token:string,idlist:string,idcrypto:string,crypto?: BasicCrypto):Observable<any>,

    /**
     * Removes a crypto from a user's favorite list.
     * @param token Authorization token.
     * @param listid ID of the favorite list.
     * @param cryptoid ID of the crypto to remove.
     * @returns Observable with the operation result.
     */
    removeCryptoFromList(token:string,listid:string,cryptoid:string):Observable<any>

    /**
     * Finds a crypto by its ID.
     * @param token Authorization token.
     * @param idcrypto ID of the crypto.
     * @returns Observable with the found crypto or error.
     */
    findcryptobyid(token:string,idcrypto:string):Observable<any>

    /**
     * Adds a new crypto to the database.
     * @param token Authorization token.
     * @param crypto Crypto data to add.
     * @returns Observable with the operation result.
     */
    addcryptotodatabase(token:string,crypto:BasicCrypto):Observable<any>,

    /**
     * Updates user data.
     * @param token Authorization token.
     * @param data Data to update.
     * @param userid User ID.
     * @returns Observable with the operation result.
     */
    updateuserdata(token:string,data:any,userid:string):Observable<any>,

    /**
     * Retrieves a paginated list of users for admin purposes.
     * @param token Authorization token.
     * @param page Page number.
     * @param limit Number of users per page.
     * @returns Observable with paginated users.
     */
    AdminGetUsersPagination(token:string, page: number, limit: number): Observable<any>

    /**
     * Deletes a user by ID (admin operation).
     * @param token Authorization token.
     * @param iduser User ID to delete.
     * @returns Observable with the operation result.
     */
    AdminDeleteUser(token:string, iduser:string): Observable<any>

    /**
     * Updates user data with admin privileges.
     * @param token Authorization token.
     * @param iduser User ID to update.
     * @param username New username.
     * @param gender New gender.
     * @param isAdmin Boolean indicating if user is admin.
     * @returns Observable with the operation result.
     */
    AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any>
}