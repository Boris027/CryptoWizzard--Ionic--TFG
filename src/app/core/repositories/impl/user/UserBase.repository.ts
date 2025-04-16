import { Inject, Injectable } from "@angular/core";
import { IUserbaseRepositoy } from "../../interfaces/user/User-base.interface";
import { User } from "src/app/core/models/User.model";
import { HttpClient } from "@angular/common/http";
import { USER_API_URL_TOKEN, USER_MAPPING_TOKEN } from "../../repository.tokens";
import { IUserBaseMapping } from "../../interfaces/user/UserBaseMapping.interface";
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";
import { Observable } from "rxjs";
import { BasicCrypto } from "src/app/core/models/Crypto.model";

@Injectable({
    providedIn: 'root'
})

export class UserBaseRepository<T extends User> implements IUserbaseRepositoy<T>{

    constructor(
        protected httpclient:HttpClient,
        @Inject(USER_API_URL_TOKEN) protected api:string,
        @Inject(USER_MAPPING_TOKEN) protected mapping:IUserBaseMapping<User>,
    ){}
    AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any> {
        throw new Error("Method not implemented.");
    }
    AdminGetUsersPagination(token: string, page: number, limit: number): Observable<any> {
        throw new Error("Method not implemented.");
    }
    AdminDeleteUser(token: string, iduser: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    GetBasicUser(token: string, id: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    updateuserdata(token: string, data: any, userid: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    addCryptoToList(token: string, idlist: string, idcrypto: string,crypto?: BasicCrypto): Observable<any> {
        throw new Error("Method not implemented.");
    }
    findcryptobyid(token:string,idcrypto: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    addcryptotodatabase(token:string,crypto: BasicCrypto): Observable<any> {
        throw new Error("Method not implemented.");
    }
    removeCryptoFromList(token: string, listid: string, cryptoid: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    updatelistFromUser(token: String, list: BasicList): Observable<any> {
        throw new Error("Method not implemented.");
    }
    GetListFromUser(token: string,id?:string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    addlistToUser(token: string, list: CryptoList,iduser:string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    removelistFromUser(token: String, listid: string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    
    

    

}