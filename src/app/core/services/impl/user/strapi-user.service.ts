import { Inject, Injectable } from "@angular/core";
import { IStrapiService } from "../../interfaces/user/Strapi.service.interface";
import { UserBaseService } from "./base-user.service";
import { BasicUser, User } from "src/app/core/models/User.model";
import { AUTH_TOKEN, USER_CSV_URL_TOKEN, USER_REPOSITORY_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IUserbaseRepositoy } from "src/app/core/repositories/interfaces/user/User-base.interface";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserStrapiService extends UserBaseService<User> implements IStrapiService{
    constructor(
        @Inject (USER_REPOSITORY_TOKEN) repository:IUserbaseRepositoy<User>,
        @Inject (AUTH_TOKEN) auth:IAuthenticationService,
        @Inject(USER_CSV_URL_TOKEN) url:string,
        http: HttpClient
    ){
        super(repository,auth,url,http)
    }


}
