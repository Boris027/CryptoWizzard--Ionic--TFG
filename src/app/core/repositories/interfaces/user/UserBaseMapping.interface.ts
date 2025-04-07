import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";

export interface IUserBaseMapping<T>{

    GetListFromUser(data:any,id?:string):CryptoList[]
    addlistUser(data:any,iduser:string):any
    addlistUserResponse(data:any):BasicList
    updatelistbody(data:any):any
    deletecryptofromlist(data:any):any
    findcryptobyidresponse(data:any,idcrypto:string):any
    addcryptotodatabase(data:any):any
    addcryptoresponse(data:any):any
    addcryptotolist(data:any):any
    updateuserdata(data:any):any
    GetBasicUser(data:any,name?:string,gender?:string,image?:string):any
}