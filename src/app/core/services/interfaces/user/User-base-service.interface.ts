import { HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { BasicCrypto } from "src/app/core/models/Crypto.model"
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model"
import { BasicUser } from "src/app/core/models/User.model"

export interface IUserbaseService<T>{
    /**
     * Retrieves the list of crypto lists for a user.
     * @param id Optional user ID to retrieve lists for. If omitted, current user is assumed.
     * @returns Observable emitting an array of CryptoList objects.
     */
    GetListFromUser(id?:string):Observable<CryptoList[]>

    /**
     * Adds a new list to the user.
     * @param list The BasicList object to add.
     * @returns Observable emitting the added BasicList.
     */
    addlistToUser(list:BasicList):Observable<BasicList>

    /**
     * Removes a list from the user by its ID.
     * @param listid The ID of the list to remove.
     * @returns Observable emitting the removed BasicList.
     */
    removelistFromUser(listid:string):Observable<BasicList>

    /**
     * Updates an existing list for the user.
     * @param list The BasicList object with updated data.
     * @returns Observable emitting the updated BasicList.
     */
    updatelistFromUser(list:BasicList):Observable<BasicList>

    /**
     * Adds a cryptocurrency to a specified list.
     * @param idlist The ID of the list to add the crypto to.
     * @param idcrypto The ID of the cryptocurrency to add.
     * @param crypto Optional BasicCrypto object with extra crypto details.
     * @returns Observable emitting any response from the operation.
     */
    addCryptoToList(idlist:string,idcrypto:string,crypto?: BasicCrypto):Observable<any>,

    /**
     * Removes a cryptocurrency from a specified list.
     * @param listid The ID of the list.
     * @param cryptoid The ID of the cryptocurrency to remove.
     * @returns Observable emitting any response from the operation.
     */
    removeCryptoFromList(listid:string,cryptoid:string):Observable<any>

    /**
     * Finds a cryptocurrency by its ID.
     * @param idcrypto The ID of the cryptocurrency to find.
     * @returns Observable emitting the found cryptocurrency data.
     */
    findcryptobyid(idcrypto:string):Observable<any>

    /**
     * Adds a new cryptocurrency to the database.
     * @param crypto The BasicCrypto object to add.
     * @returns Observable emitting any response from the operation.
     */
    addcryptotodatabase(crypto:BasicCrypto):Observable<any>

    /**
     * Updates the user data with provided information.
     * @param data The data object containing updates.
     * @returns Observable emitting the updated user data or response.
     */
    updateuserdata(data:any):Observable<any>

    /**
     * Retrieves basic information about the current user.
     * @returns Observable emitting user basic information.
     */
    GetBasicUser():Observable<any>

    /**
     * Retrieves the current user as a BehaviorSubject observable.
     * @returns Observable emitting BasicUser data reactively.
     */
    GetBehaviourUser():Observable<BasicUser>

    /**
     * Retrieves paginated users for admin purposes.
     * @param token Authorization token.
     * @param page Page number to retrieve.
     * @param limit Number of users per page.
     * @returns Observable emitting paginated users data.
     */
    AdminGetUsersPagination(token:string, page: number, limit: number): Observable<any>

    /**
     * Deletes a user by admin.
     * @param token Authorization token.
     * @param iduser The ID of the user to delete.
     * @returns Observable emitting any response from the deletion.
     */
    AdminDeleteUser(token:string, iduser:string): Observable<any>

    /**
     * Updates user details by admin.
     * @param token Authorization token.
     * @param iduser The ID of the user to update.
     * @param username The new username.
     * @param gender The new gender.
     * @param isAdmin Boolean indicating if the user has admin rights.
     * @returns Observable emitting any response from the update.
     */
    AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any>

    /**
     * Retrieves the users CSV file.
     * @returns Observable emitting the HTTP response containing the CSV Blob.
     */
    getUsersCsv(): Observable<HttpResponse<Blob>>
}