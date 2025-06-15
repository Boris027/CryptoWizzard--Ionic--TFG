import { Inject, Injectable } from "@angular/core";
import { UserBaseRepository } from "./UserBase.repository";
import { IUserStrapiRepositoy } from "../../interfaces/user/Strapi.interface";
import { User } from "src/app/core/models/User.model";
import { HttpClient } from "@angular/common/http";
import { IUserBaseMapping } from "../../interfaces/user/UserBaseMapping.interface";
import { USER_API_URL_TOKEN, USER_MAPPING_TOKEN } from "../../repository.tokens";
import { map, Observable } from "rxjs";
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";
import { BasicCrypto } from "src/app/core/models/Crypto.model";

@Injectable({
    providedIn: 'root'
})
export class StrapiUserRepository extends UserBaseRepository<User> implements IUserStrapiRepositoy{
    constructor(
        httpclient:HttpClient,
        @Inject(USER_API_URL_TOKEN) api:string,
        @Inject(USER_MAPPING_TOKEN) mapping:IUserBaseMapping<User>,
    ){
        super(httpclient,api,mapping)
    }
    override AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any> {
        throw new Error("Method not implemented.");
    }
    override AdminGetUsersPagination(token: string, page: number, limit: number): Observable<any> {
        throw new Error("Method not implemented.");
    }
    override AdminDeleteUser(token: string, iduser: string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Fetches the authenticated user's lists including cryptos from Strapi.
     * @param token Authentication bearer token.
     * @returns Observable emitting user's lists with cryptos.
     */
    override GetListFromUser(token: string): Observable<any> {
        return this.httpclient.get(this.api+'users/me?populate[favoritelists][populate][cryptos]=true',{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }).pipe(
            map(c=>{
                return this.mapping.GetListFromUser(c)
            })
        )
    }

    /**
     * Adds a new list to the authenticated user.
     * @param token Authentication bearer token.
     * @param list List data to add.
     * @param iduser User ID (required by mapping).
     * @returns Observable emitting the added list response.
     */
    override addlistToUser(token: string, list: CryptoList,iduser:string): Observable<any> {
        return this.httpclient.post(this.api+"favoritelists",this.mapping.addlistUser(list,iduser),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }).pipe(
            map(c=>{
                return this.mapping.addlistUserResponse(c)
            })
        )
    }

    /**
     * Removes a list by its ID from the authenticated user.
     * @param token Authentication bearer token.
     * @param listid List ID to remove.
     * @returns Observable emitting response of deletion.
     */
    override removelistFromUser(token: String, listid: string): Observable<any> {
        return this.httpclient.delete(this.api+`favoritelists/${listid}`,{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map(c=>{
                return this.mapping.addlistUserResponse(c)
            })
        )
        
    }

    /**
     * Updates an existing list of the authenticated user.
     * @param token Authentication bearer token.
     * @param list List data to update.
     * @returns Observable emitting the updated list response.
     */

    override updatelistFromUser(token: String, list: BasicList): Observable<any> {
        return this.httpclient.put(this.api+`favoritelists/${list.id}`,this.mapping.updatelistbody(list),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map(c=>{
                return this.mapping.addlistUserResponse(c)
            })
        )
    }

    /**
     * Removes a crypto from a specific list.
     * @param token Authentication bearer token.
     * @param listid List ID from which to remove the crypto.
     * @param cryptoid Crypto ID to remove.
     * @returns Observable emitting response after removal.
     */
    override removeCryptoFromList(token: string, listid: string, cryptoid: string): Observable<any> {
        return this.httpclient.put(this.api+`favoritelists/${listid}`,this.mapping.deletecryptofromlist(cryptoid),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map(c=>{
                return this.mapping.addlistUserResponse(c)
            })
        )
    }

    /**
     * Finds a crypto by its ID.
     * @param token Authentication bearer token.
     * @param idcrypto Crypto ID to search for.
     * @returns Observable emitting the found crypto or empty if not found.
     */
    override findcryptobyid(token:string,idcrypto: string): Observable<any> {
        return this.httpclient.get(this.api+`cryptos?filters[cryptoId][$eq]=${idcrypto}`,{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map(
                (c=>{
                    return this.mapping.findcryptobyidresponse(c,idcrypto)
                })
            )
        )
    }

    /**
     * Adds a new crypto to the database.
     * @param token Authentication bearer token.
     * @param crypto Crypto data to add.
     * @returns Observable emitting the response after adding.
     */
    override addcryptotodatabase(token:string,crypto: BasicCrypto): Observable<any> {
        return this.httpclient.post(this.api+"cryptos",this.mapping.addcryptotodatabase(crypto),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map(
                (c=>{
                    return this.mapping.addcryptoresponse(c)
                })
            )
        )
    }

    /**
     * Adds a crypto to a user's favorite list.
     * @param token Authentication bearer token.
     * @param idlist List ID to add the crypto to.
     * @param idcrypto Crypto ID to add.
     * @returns Observable emitting the updated list response.
     */
    override addCryptoToList(token: string, idlist: string, idcrypto: string): Observable<any> {
        return this.httpclient.put(this.api+`favoritelists/${idlist}`,this.mapping.addcryptotolist(idcrypto),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map((c=>{
                return c
            }))
        )
    }

    /**
     * Updates user data.
     * @param token Authentication bearer token.
     * @param data Data object containing fields to update.
     * @param userid User ID to update.
     * @returns Observable emitting the updated BasicUser.
     */
    override updateuserdata(token: string, data: any,userid:string): Observable<any> {
        return this.httpclient.put(this.api+`users/${userid}`,this.mapping.updateuserdata(data),{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map((c)=>{
                return this.mapping.GetBasicUser(c)
            })
        )
    }

    /**
     * Retrieves basic user information by ID.
     * @param token Authentication bearer token.
     * @param id User ID to fetch.
     * @returns Observable emitting the BasicUser information.
     */
    override GetBasicUser(token: string, id: string): Observable<any> {
        return this.httpclient.get(this.api+`users/${id}?populate=image`,{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }}).pipe(
            map((c)=>{
                return this.mapping.GetBasicUser(c)
            })
        )
    }
}