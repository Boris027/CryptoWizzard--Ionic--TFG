import { Inject, Injectable } from "@angular/core";
import { IUserbaseService } from "../../interfaces/user/User-base-service.interface";
import { BasicUser, User } from "src/app/core/models/User.model";
import { AUTH_TOKEN, USER_CSV_URL_TOKEN, USER_REPOSITORY_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IUserbaseRepositoy } from "src/app/core/repositories/interfaces/user/User-base.interface";
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";
import { BehaviorSubject, map, Observable } from "rxjs";
import { BasicCrypto } from "src/app/core/models/Crypto.model";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";
import { HttpClient, HttpResponse } from "@angular/common/http";

/**
 * Generic service for user-related operations implementing IUserbaseService.
 * Handles user data, user lists, and interaction with the user repository.
 * 
 * @template T - A type extending User model.
 */
@Injectable({
    providedIn: 'root'
})
export class UserBaseService<T extends User> implements IUserbaseService<T>{
    /**
     * BehaviorSubject holding the current basic user data.
     */
    user: BehaviorSubject<BasicUser> = new BehaviorSubject<BasicUser>({
        id: '',
        username: '',
        email: '',
        img:"",
        gender:'',
        isAdmin:false
    });

    /**
     * Creates an instance of UserBaseService.
     * 
     * @param repository - The user repository injected for data operations.
     * @param auth - Authentication service injected to get current user/token info.
     * @param url - The URL token for fetching user CSV data.
     * @param http - Angular HttpClient for HTTP operations.
     */
    constructor(
        @Inject (USER_REPOSITORY_TOKEN) protected repository:IUserbaseRepositoy<User>,
        @Inject (AUTH_TOKEN) protected auth:IAuthenticationService,
        @Inject(USER_CSV_URL_TOKEN) protected url:string,
        protected http:HttpClient
    ){ }
    
    /**
     * Downloads a CSV file containing users data.
     * 
     * @returns An Observable emitting the HTTP response containing the CSV blob.
     */
    getUsersCsv(): Observable<HttpResponse<Blob>> {
        return this.http.get(this.url, { responseType: 'blob', observe: 'response' });
    }

    /**
     * Gets the BehaviorSubject as an Observable for user data updates.
     * 
     * @returns An Observable emitting the current BasicUser data.
     */
    GetBehaviourUser():Observable<BasicUser>{
        return this.user.asObservable()
    }

    /**
     * Fetches basic user data from the repository using the authenticated user's token and ID.
     * Updates the BehaviorSubject with the fetched data.
     * If no user image exists, assigns a default avatar path.
     * 
     * @returns An Observable emitting the BasicUser data.
     */
    GetBasicUser(): Observable<BasicUser> {
        return this.repository.GetBasicUser(this.auth.getToken(),this.auth.getId()).pipe(
            map((c)=>{
                if(c.img=='' || c.img==null){
                    c.img='../../../assets/avatar.svg'
                }
                this.user.next(c)
                return c
            })
        )
    }

    /**
     * Updates user data via the repository and updates the BehaviorSubject.
     * If the updated data does not include an image, retains the current image.
     * 
     * @param data - The user data to update.
     * @returns An Observable emitting the updated BasicUser data.
     */
    updateuserdata(data: any): Observable<BasicUser> {
        return this.repository.updateuserdata(this.auth.getToken(),data,this.auth.getId()).pipe(
            map((c)=>{
                let value=this.user.getValue()
                if(data.image==undefined){
                    c.img=value.img
                }else{
                    c.img=data.image.url
                }
                this.user.next(c)
                return c
            })
        )
    }

    /**
     * Adds a cryptocurrency to a user's crypto list.
     * 
     * @param idlist - The ID of the list to add to.
     * @param idcrypto - The ID of the cryptocurrency to add.
     * @param crypto - Optional cryptocurrency data.
     * @returns An Observable emitting the operation result.
     */
    addCryptoToList(idlist: string, idcrypto: string,crypto?: BasicCrypto): Observable<any> {
        return this.repository.addCryptoToList(this.auth.getToken(),idlist,idcrypto,crypto)
    }

    /**
     * Finds a cryptocurrency by its ID.
     * 
     * @param idcrypto - The cryptocurrency ID to find.
     * @returns An Observable emitting the found cryptocurrency data.
     */
    findcryptobyid( idcrypto: string): Observable<any> {
        return this.repository.findcryptobyid(this.auth.getToken(),idcrypto)
    }
    
    /**
     * Adds a new cryptocurrency to the database.
     * 
     * @param crypto - The cryptocurrency data to add.
     * @returns An Observable emitting the operation result.
     */
    addcryptotodatabase(crypto: BasicCrypto): Observable<any> {
        return this.repository.addcryptotodatabase(this.auth.getToken(),crypto)
    }
    
    /**
     * Retrieves the crypto lists associated with a user.
     * 
     * @param id - Optional user ID. If omitted, uses current user.
     * @returns An Observable emitting an array of CryptoList objects.
     */
    GetListFromUser(id?:string):Observable<CryptoList[]> {
        return this.repository.GetListFromUser(this.auth.getToken(),id)
    }

    /**
     * Adds a new crypto list to the user.
     * 
     * @param list - The BasicList data to add.
     * @returns An Observable emitting the added BasicList.
     */
    addlistToUser(list: BasicList):Observable<BasicList> {
        return this.repository.addlistToUser(this.auth.getToken(),list,this.auth.getId())
    }

    /**
     * Updates an existing crypto list for the user.
     * 
     * @param list - The BasicList data to update.
     * @returns An Observable emitting the updated BasicList.
     */
    updatelistFromUser( list: BasicList): Observable<BasicList> {
        return this.repository.updatelistFromUser(this.auth.getToken(),list)
    }

    /**
     * Removes a crypto list from the user.
     * 
     * @param listid - The ID of the list to remove.
     * @returns An Observable emitting the removed BasicList.
     */
    removelistFromUser( listid: string):Observable<BasicList> {
        return this.repository.removelistFromUser(this.auth.getToken(),listid+"")
    }
    
    /**
     * Removes a cryptocurrency from a user's crypto list.
     * 
     * @param listid - The ID of the list.
     * @param cryptoid - The ID of the cryptocurrency to remove.
     * @returns An Observable emitting the operation result.
     */
    removeCryptoFromList(listid:string,cryptoid:string): Observable<any> {
        return this.repository.removeCryptoFromList(this.auth.getToken(),listid,cryptoid)
    }

    /**
     * Admin operation: Retrieves paginated users.
     * 
     * @param token - Admin auth token.
     * @param page - The page number.
     * @param limit - Number of users per page.
     * @returns An Observable emitting paginated users data.
     */
    AdminGetUsersPagination(token: string, page: number, limit: number): Observable<any> {
        return this.repository.AdminGetUsersPagination(token,page,limit)
    }

    /**
     * Admin operation: Deletes a user by ID.
     * 
     * @param token - Admin auth token.
     * @param iduser - The user ID to delete.
     * @returns An Observable emitting the deletion result.
     */
    AdminDeleteUser(token: string, iduser: string): Observable<any> {
        return this.repository.AdminDeleteUser(token,iduser)
    }

    /**
     * Admin operation: Updates a user's data.
     * 
     * @param token - Admin auth token.
     * @param iduser - The user ID to update.
     * @param username - The new username.
     * @param gender - The new gender.
     * @param isAdmin - The admin status flag.
     * @returns An Observable emitting the update result.
     */
    AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any> {
        return this.repository.AdminUpdateUser(token,iduser,username,gender,isAdmin)
    }
}