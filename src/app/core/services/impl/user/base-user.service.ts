import { Inject, Injectable } from "@angular/core";
import { IUserbaseService } from "../../interfaces/user/User-base-service.interface";
import { BasicUser, User } from "src/app/core/models/User.model";
import { AUTH_TOKEN, USER_REPOSITORY_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IUserbaseRepositoy } from "src/app/core/repositories/interfaces/user/User-base.interface";
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";
import { BehaviorSubject, map, Observable } from "rxjs";
import { BasicCrypto } from "src/app/core/models/Crypto.model";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";

@Injectable({
    providedIn: 'root'
})

export class UserBaseService<T extends User> implements IUserbaseService<T>{

    user: BehaviorSubject<BasicUser> = new BehaviorSubject<BasicUser>({
        id: '',
        username: '',
        email: '',
        img:"",
        gender:'',
        isAdmin:false
    });

    constructor(
        @Inject (USER_REPOSITORY_TOKEN) protected repository:IUserbaseRepositoy<User>,
        @Inject (AUTH_TOKEN) protected auth:IAuthenticationService
    ){
        
    }
    
    


    GetBehaviourUser():Observable<BasicUser>{
        return this.user.asObservable()
    }

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
    addCryptoToList(idlist: string, idcrypto: string,crypto?: BasicCrypto): Observable<any> {
        return this.repository.addCryptoToList(this.auth.getToken(),idlist,idcrypto,crypto)
    }
    findcryptobyid( idcrypto: string): Observable<any> {
        return this.repository.findcryptobyid(this.auth.getToken(),idcrypto)
    }
    
    addcryptotodatabase(crypto: BasicCrypto): Observable<any> {
        return this.repository.addcryptotodatabase(this.auth.getToken(),crypto)
    }
    
    GetListFromUser(id?:string):Observable<CryptoList[]> {
        return this.repository.GetListFromUser(this.auth.getToken(),id)
    }
    addlistToUser(list: BasicList):Observable<BasicList> {
        return this.repository.addlistToUser(this.auth.getToken(),list,this.auth.getId())
    }
    updatelistFromUser( list: BasicList): Observable<BasicList> {
        return this.repository.updatelistFromUser(this.auth.getToken(),list)
    }
    removelistFromUser( listid: string):Observable<BasicList> {
        return this.repository.removelistFromUser(this.auth.getToken(),listid+"")
    }
    
    removeCryptoFromList(listid:string,cryptoid:string): Observable<any> {
        return this.repository.removeCryptoFromList(this.auth.getToken(),listid,cryptoid)
    }
    AdminGetUsersPagination(token: string, page: number, limit: number): Observable<any> {
        return this.repository.AdminGetUsersPagination(token,page,limit)
    }
    AdminDeleteUser(token: string, iduser: string): Observable<any> {
        return this.repository.AdminDeleteUser(token,iduser)
    }
    AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdmin: boolean): Observable<any> {
        return this.repository.AdminUpdateUser(token,iduser,username,gender,isAdmin)
    }
}
