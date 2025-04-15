import { Observable } from "rxjs"
import { BasicCrypto } from "src/app/core/models/Crypto.model"
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model"
import { User } from "src/app/core/models/User.model"

export interface IUserbaseRepositoy<T>{

    GetBasicUser(token:string,id:string):Observable<any>
    GetListFromUser(token:string,id?:string):Observable<any>
    addlistToUser(token:string,list:BasicList,iduser:string):Observable<any>
    removelistFromUser(token:string,listid:string):Observable<any>,
    updatelistFromUser(token:string,list:BasicList):Observable<any>
    addCryptoToList(token:string,idlist:string,idcrypto:string,crypto?: BasicCrypto):Observable<any>,
    removeCryptoFromList(token:string,listid:string,cryptoid:string):Observable<any>
    findcryptobyid(token:string,idcrypto:string):Observable<any>
    addcryptotodatabase(token:string,crypto:BasicCrypto):Observable<any>,
    updateuserdata(token:string,data:any,userid:string):Observable<any>,
    AdminGetUsersPagination(token:string, page: number, limit: number): Observable<any>
    AdminDeleteUser(token:string, iduser:string): Observable<any>
}