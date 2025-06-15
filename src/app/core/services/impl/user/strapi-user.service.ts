import { Inject, Injectable } from "@angular/core";
import { IStrapiService } from "../../interfaces/user/Strapi.service.interface";
import { UserBaseService } from "./base-user.service";
import { User } from "src/app/core/models/User.model";
import { AUTH_TOKEN, USER_CSV_URL_TOKEN, USER_REPOSITORY_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IUserbaseRepositoy } from "src/app/core/repositories/interfaces/user/User-base.interface";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";
import { HttpClient } from "@angular/common/http";

/**
 * Service extending UserBaseService to manage user operations
 * specifically tailored for Strapi backend integration.
 * Implements the IStrapiService interface.
 */
@Injectable({
    providedIn: 'root'
})
export class UserStrapiService extends UserBaseService<User> implements IStrapiService{
    /**
     * Creates an instance of UserStrapiService.
     * 
     * @param repository - User repository for data access.
     * @param auth - Authentication service to handle auth tokens and user info.
     * @param url - URL token for user CSV export.
     * @param http - Angular HttpClient for HTTP requests.
     */
    constructor(
        @Inject (USER_REPOSITORY_TOKEN) repository:IUserbaseRepositoy<User>,
        @Inject (AUTH_TOKEN) auth:IAuthenticationService,
        @Inject(USER_CSV_URL_TOKEN) url:string,
        http: HttpClient
    ){
        super(repository,auth,url,http)
    }
}