import { Injectable } from "@angular/core";
import { IUserBaseMapping } from "../../interfaces/user/UserBaseMapping.interface";
import { BasicUser, User } from "src/app/core/models/User.model";
import { CryptoList, BasicList } from "src/app/core/models/CryptoList.model";
import { LoginResponse } from "src/app/core/services/impl/authentication/firebase-auth-mapping.service";

export interface rawbasiclist {
    id:string,
    description: string,
    title: string,
    cryptos?:cryptosxd[]
}
export interface cryptosxd {
    id:string,
    symbol: string
    name: string
}

/**
 * Mapping service responsible for converting raw Firebase user data
 * into application models and vice versa.
 * 
 * Implements IUserBaseMapping interface for user-related data transformation.
 */
@Injectable({
    providedIn: 'root'
})
export class FirebaseUserMapping implements IUserBaseMapping<User>{
    /**
     * Maps an array of raw user lists from Firebase into CryptoList models.
     * 
     * @param data Raw user list data array.
     * @returns Array of CryptoList objects mapped from the raw data.
     */
    GetListFromUser(data: rawbasiclist[]): CryptoList[] {
        let listafinal:CryptoList[]=data.map(c=>{
            return {
                id:c.id,
                title:c.title,
                description:c.description,
                cryptos:c.cryptos?.map(x=>{
                    return {
                        id:x.id,
                        symbol:x.symbol,
                        name:x.name
                    }
                })??[]
            }
        })
        return listafinal
    }

    addlistUser(data: any, iduser: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Maps the response data when adding a new list for a user.
     * 
     * @param data Raw response data from adding a list.
     * @returns BasicList model constructed from the response.
     */
    addlistUserResponse(data: any): BasicList {
        return {
            id:data.id,
            title:data.title,
            description:data.description
        }
    }

    updatelistbody(data: any) {
        throw new Error("Method not implemented.");
    }

    deletecryptofromlist(data: any) {
        throw new Error("Method not implemented.");
    }

    findcryptobyidresponse(data: any, idcrypto: string) {
        throw new Error("Method not implemented.");
    }

    addcryptotodatabase(data: any) {
        throw new Error("Method not implemented.");
    }

    addcryptoresponse(data: any) {
        throw new Error("Method not implemented.");
    }

    addcryptotolist(data: any) {
        throw new Error("Method not implemented.");
    }

    updateuserdata(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Constructs a BasicUser model from login response and optional user details.
     * 
     * @param data LoginResponse object containing Firebase authentication data.
     * @param name Optional username.
     * @param gender Optional user gender.
     * @param image Optional user image URL.
     * @param isAdmin Optional flag indicating if the user has admin privileges.
     * @returns BasicUser model constructed from the provided data.
     */
    GetBasicUser(data: LoginResponse,name?:string,gender?:string,image?:string,isAdmin?:boolean):BasicUser {
        return {
            username:name!,
            email:data.email,
            id:data.uid,
            gender:gender!,
            img:image??"",
            isAdmin:isAdmin??false
        }
    }
}