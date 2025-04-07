import { Observable } from "rxjs"
import { BasicCrypto } from "src/app/core/models/Crypto.model"
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model"
import { BasicUser } from "src/app/core/models/User.model"

export interface IUserbaseService<T>{

    GetListFromUser(id?:string):Observable<CryptoList[]>
    addlistToUser(list:BasicList):Observable<BasicList>
    removelistFromUser(listid:string):Observable<BasicList>
    updatelistFromUser(list:BasicList):Observable<BasicList>
    addCryptoToList(idlist:string,idcrypto:string,crypto?: BasicCrypto):Observable<any>,
    removeCryptoFromList(listid:string,cryptoid:string):Observable<any>
    findcryptobyid(idcrypto:string):Observable<any>
    addcryptotodatabase(crypto:BasicCrypto):Observable<any>
    updateuserdata(data:any):Observable<any>
    GetBasicUser():Observable<any>
    GetBehaviourUser():Observable<BasicUser>
}