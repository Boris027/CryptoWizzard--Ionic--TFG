import { Inject, Injectable } from "@angular/core";
import { UserBaseService } from "./base-user.service";
import { User } from "src/app/core/models/User.model";
import { AUTH_TOKEN, USER_CSV_URL_TOKEN, USER_REPOSITORY_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";
import { IUserbaseRepositoy } from "src/app/core/repositories/interfaces/user/User-base.interface";
import { IFirebaseService } from "../../interfaces/user/Firebase.service.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserFirebaseService extends UserBaseService<User> implements IFirebaseService{
    constructor(
        @Inject (USER_REPOSITORY_TOKEN) repository:IUserbaseRepositoy<User>,
        @Inject (AUTH_TOKEN) auth:IAuthenticationService,
        @Inject(USER_CSV_URL_TOKEN) url:string,
        http:HttpClient

    ){
        super(repository,auth,url,http)
    }


}