import { FactoryProvider } from "@angular/core";
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, AUTH_TOKEN, BACKEND_TOKEN, CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN, CRYPTO_REPOSITORY_TOKEN, FIREBASE_MAIN_SERVICE, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, UPLOAD_API_URL_TOKEN, USER_API_URL_TOKEN, USER_CSV_URL_TOKEN, USER_MAPPING_TOKEN, USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from "./repository.tokens";
import { HttpClient } from "@angular/common/http";
import { StrapiAutenticationService } from "../services/impl/authentication/strapi-autentication.service";
import { StrapiAuthMappingService } from "../services/impl/authentication/strapi-auth-mapping.service";
import { CoinGekoRepository } from "./impl/crypto/CoinGeko.repository";
import { ICryptoBaseMapping } from "./interfaces/crypto/CryptoBaseMapping.interface";
import { IUserBaseMapping } from "./interfaces/user/UserBaseMapping.interface";
import { StrapiUserRepository } from "./impl/user/StrapiUser.repository";
import { BaseMediaService } from "../services/impl/media/base-media.service";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { StrapiMediaService } from "../services/impl/media/strapi-media.service";
import { StrapiUserMapping } from "./impl/user/StrapiUserMapping.service";
import { FirebaseUserMapping } from "./impl/user/Firebase-User-Mapping.service";
import { UserStrapiService } from "../services/impl/user/strapi-user.service";
import { UserFirebaseService } from "../services/impl/user/firebase-user.service";
import { IUserbaseRepositoy } from "./interfaces/user/User-base.interface";
import { IAuthenticationMapping } from "../services/interfaces/authentication/auth-mapping.interface";
import { FirebaseAuthenticationService } from "../services/impl/authentication/firebase-authentication.service";
import { FirebaseAuthMappingService } from "../services/impl/authentication/firebase-auth-mapping.service";
import { FirebaseUserRepository } from "./impl/user/Firebase-user.repository";
import { IFirebaseMainService } from "../services/interfaces/firebasemain.service.interface";
import { FirebaseMediaService } from "../services/impl/media/firebase-media.service";
import { AngularFireFunctions } from "@angular/fire/compat/functions";

/**
 * Creates an instance of CoinGekoRepository with the required dependencies.
 *
 * @param {HttpClient} httpclient - The HTTP client used to make API requests.
 * @param {string} apiurltoken - The base URL or token for the cryptocurrency API.
 * @param {ICryptoBaseMapping<any>} mapping - The mapping service to transform API data.
 * @param {string} cryptoken - The authentication token for accessing the cryptocurrency API.
 * @returns {CoinGekoRepository} Configured instance of CoinGekoRepository.
 */
function createCoinGekorepository(httpclient:HttpClient,apiurltoken:string,mapping:ICryptoBaseMapping<any>,cryptoken:string){
    return new CoinGekoRepository(httpclient,apiurltoken,mapping,cryptoken)
}

/**
 * Factory provider for the cryptocurrency repository.
 *
 * Depending on the configured backend, this factory returns an instance
 * of the appropriate crypto repository implementation.
 *
 * @constant {FactoryProvider}
 * @property {InjectionToken} provide - The token to inject the crypto repository.
 * @property {Array} deps - Dependencies to inject into the factory function.
 * @property {function(string, HttpClient, string, ICryptoBaseMapping<any>, string): any} useFactory
 *   - Factory function that returns the crypto repository instance based on backend type.
 *
 * @throws {Error} Throws an error if the backend is not implemented.
 */
export const cryptofactoryservice:FactoryProvider={
    provide:CRYPTO_REPOSITORY_TOKEN,
    deps:[BACKEND_TOKEN,HttpClient,CRYPTO_API_URL_TOKEN,CRYPTO_MAPPING_TOKEN,CRYPTOTOKEN_TOKEN],
    useFactory:(backend:string,httpclient:HttpClient,apiurltoken:string,mapping:ICryptoBaseMapping<any>,cryptoken:string)=>{
        switch(backend){
          case 'http':
            throw new Error("BACKEND NOT IMPLEMENTED");
          case 'local-storage':
            throw new Error("BACKEND NOT IMPLEMENTED");
          case 'json-server':
            throw new Error("BACKEND NOT IMPLEMENTED");
          case 'strapi':
            return createCoinGekorepository(httpclient,apiurltoken,mapping,cryptoken)
          case 'firebase':
            return createCoinGekorepository(httpclient,apiurltoken,mapping,cryptoken)
            default:
            throw new Error("BACKEND NOT IMPLEMENTED");
        }
    }
}

/**
 * Creates and returns a new instance of StrapiUserRepository.
 *
 * @param {HttpClient} httpclient - The Angular HttpClient used to perform HTTP requests.
 * @param {string} apiurltoken - The API base URL or endpoint token for the user service.
 * @param {IUserBaseMapping<any>} mapping - The mapping service to transform API responses to user domain models.
 * @returns {StrapiUserRepository} A new instance of StrapiUserRepository configured with the provided dependencies.
 */
function createStrapiRepository(httpclient:HttpClient,apiurltoken:string,mapping:IUserBaseMapping<any>){
    return new StrapiUserRepository(httpclient,apiurltoken,mapping)
}

/**
 * Factory provider for the user repository.
 * 
 * It dynamically creates and provides the appropriate user repository implementation
 * based on the configured backend type.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: Defines which backend to use ('strapi', 'firebase', etc.).
 * - HttpClient: Angular's HTTP client for making HTTP requests.
 * - USER_API_URL_TOKEN: The base API URL for user-related endpoints.
 * - USER_MAPPING_TOKEN: Mapping service to convert API data into user domain models.
 * - FIREBASE_MAIN_SERVICE: Firebase service interface (used if backend is Firebase).
 * - AngularFireFunctions: Firebase cloud functions client (used if backend is Firebase).
 * 
 * Backend handling:
 * - 'strapi': Returns a StrapiUserRepository instance.
 * - 'firebase': Returns a FirebaseUserRepository instance.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: USER_REPOSITORY_TOKEN
 */
export const userfactoryservice:FactoryProvider={
    provide:USER_REPOSITORY_TOKEN,
    deps:[BACKEND_TOKEN,HttpClient,USER_API_URL_TOKEN,USER_MAPPING_TOKEN,FIREBASE_MAIN_SERVICE],
    useFactory:(backend:string,httpclient:HttpClient,apiurltoken:string,mapping:IUserBaseMapping<any>,firebasemainservice:IFirebaseMainService,functions: AngularFireFunctions)=>{
      switch(backend){
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return createStrapiRepository(httpclient,apiurltoken,mapping)
        case 'firebase':
          return new FirebaseUserRepository(httpclient,apiurltoken,mapping,firebasemainservice,functions)
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    }
}

/**
 * Factory provider for the media service.
 * 
 * Creates and provides an instance of a media service depending on the configured backend.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: Defines which backend to use ('strapi', 'firebase', etc.).
 * - UPLOAD_API_URL_TOKEN: The upload API URL or endpoint.
 * - AUTH_TOKEN: The authentication service used for authorized requests.
 * - HttpClient: Angular's HTTP client for making HTTP requests.
 * - FIREBASE_MAIN_SERVICE: Firebase main service interface (used if backend is Firebase).
 * 
 * Backend implementations:
 * - 'strapi': Returns an instance of StrapiMediaService.
 * - 'firebase': Returns an instance of FirebaseMediaService.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: BaseMediaService
 */
export const MediaServiceFactory:FactoryProvider = {
    provide: BaseMediaService,
    useFactory: (backend:string, upload:string, auth:IAuthenticationService, http:HttpClient,firebasemainservice:IFirebaseMainService) => {
      switch(backend){
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return new StrapiMediaService(upload, auth, http);
        case 'firebase':
          return new FirebaseMediaService(upload,auth,http,firebasemainservice)
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
  deps: [BACKEND_TOKEN,UPLOAD_API_URL_TOKEN, AUTH_TOKEN, HttpClient,FIREBASE_MAIN_SERVICE]
};

/**
 * Factory provider for user mapping services.
 * 
 * Provides an implementation of user mapping based on the configured backend.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: Specifies which backend to use ('strapi', 'firebase', etc.).
 * 
 * Backend implementations:
 * - 'strapi': Returns an instance of StrapiUserMapping.
 * - 'firebase': Returns an instance of FirebaseUserMapping.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: USER_MAPPING_TOKEN
 */
export const UserMappingFactory:FactoryProvider = {
  provide: USER_MAPPING_TOKEN,
  useFactory: (backend:string) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiUserMapping();
      case 'firebase':
        return new FirebaseUserMapping();
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
  },
deps: [BACKEND_TOKEN]
};

/**
 * Factory provider for user services.
 * 
 * Provides an implementation of the user service based on the configured backend.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: Specifies which backend to use ('strapi', 'firebase', etc.).
 * - USER_REPOSITORY_TOKEN: User repository interface implementation.
 * - AUTH_TOKEN: Authentication service interface implementation.
 * - USER_CSV_URL_TOKEN: URL for user CSV data.
 * - HttpClient: Angular's HTTP client for making HTTP requests.
 * 
 * Backend implementations:
 * - 'strapi': Returns an instance of UserStrapiService.
 * - 'firebase': Returns an instance of UserFirebaseService.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: USER_SERVICE_TOKEN
 */
export const UserServiceFactory:FactoryProvider = {
  provide: USER_SERVICE_TOKEN,
  useFactory: (backend:string,repository:IUserbaseRepositoy<any>,authentication:IAuthenticationService,userCsvUrl:string,http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new UserStrapiService(repository,authentication,userCsvUrl,http);
      case 'firebase':
        return new UserFirebaseService(repository,authentication,userCsvUrl,http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
  },
deps: [BACKEND_TOKEN,USER_REPOSITORY_TOKEN,AUTH_TOKEN, USER_CSV_URL_TOKEN,HttpClient]
};

/**
 * Factory provider for authentication services.
 * 
 * Provides an implementation of the authentication service depending on the backend specified.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: The backend type to use ('strapi', 'firebase', etc.).
 * - HttpClient: Angular's HTTP client for making HTTP requests.
 * - USER_API_URL_TOKEN: URL endpoint for user-related API calls.
 * - LOGIN_API_URL_TOKEN: URL endpoint for login API calls.
 * - REGISTER_API_URL_TOKEN: URL endpoint for user registration API calls.
 * - AUTENTICATION_URL_TOKEN: General authentication-related URL endpoint.
 * - AUTH_MAPPING_TOKEN: Interface implementation for authentication data mapping.
 * - FIREBASE_MAIN_SERVICE: Firebase main service interface (used only in Firebase backend).
 * 
 * Backend implementations:
 * - 'strapi': Returns an instance of StrapiAutenticationService.
 * - 'firebase': Returns an instance of FirebaseAuthenticationService.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: AUTH_TOKEN
 */
export const AuthenticationServiceFactory:FactoryProvider = {
  provide: AUTH_TOKEN,
  useFactory: (backend:string,httpclient:HttpClient,userapiurl:string,loginapiurl:string,registerapiurl:string,authenticationurl:string,authenticationmapping:IAuthenticationMapping,firebasemainservice:IFirebaseMainService) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAutenticationService(httpclient,userapiurl,loginapiurl,registerapiurl,authenticationurl,authenticationmapping);
      case 'firebase':
        return new FirebaseAuthenticationService(httpclient,userapiurl,loginapiurl,registerapiurl,authenticationurl,authenticationmapping,firebasemainservice);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
  },
deps: [BACKEND_TOKEN,HttpClient,USER_API_URL_TOKEN,LOGIN_API_URL_TOKEN,REGISTER_API_URL_TOKEN,AUTENTICATION_URL_TOKEN,AUTH_MAPPING_TOKEN,FIREBASE_MAIN_SERVICE]
};

/**
 * Factory provider for authentication mapping services.
 * 
 * Provides the appropriate authentication mapping implementation
 * depending on the configured backend.
 * 
 * Dependencies injected:
 * - BACKEND_TOKEN: The backend type to use ('strapi', 'firebase', etc.).
 * 
 * Backend implementations:
 * - 'strapi': Returns an instance of StrapiAuthMappingService.
 * - 'firebase': Returns an instance of FirebaseAuthMappingService.
 * - Other backends: Throws "BACKEND NOT IMPLEMENTED" error.
 * 
 * Provided token: AUTH_MAPPING_TOKEN
 */
export const AuthenticationMappingServiceFactory:FactoryProvider = {
  provide: AUTH_MAPPING_TOKEN,
  useFactory: (backend:string) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthMappingService();
      case 'firebase':
        return new FirebaseAuthMappingService();
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
  },
deps: [BACKEND_TOKEN]
};