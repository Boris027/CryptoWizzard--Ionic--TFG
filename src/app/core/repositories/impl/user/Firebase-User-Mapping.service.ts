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

@Injectable({
    providedIn: 'root'
})
export class FirebaseUserMapping implements IUserBaseMapping<User>{
    
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
    addlistUserResponse(data: any): BasicList {
        return {
            id:data.id,
            title:data.title,
            description:data.description
        }
        throw new Error("Method not implemented.");
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
    GetBasicUser(data: LoginResponse,name?:string,gender?:string,image?:string,isAdmin?:boolean):BasicUser {
        return {
            username:name!,
            email:data.email,
            id:data.uid,
            gender:gender!,
            img:image??"",
            isAdmin:isAdmin??false
        }
        throw new Error("Method not implemented.");
    }
    
}