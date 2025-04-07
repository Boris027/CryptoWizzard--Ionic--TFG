import { FactoryProvider } from "@angular/core";
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, AUTH_TOKEN, BACKEND_TOKEN, CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN, CRYPTO_REPOSITORY_TOKEN, CRYPTO_SERVICE_TOKEN, FIREBASE_CONFIG_TOKEN, FIREBASE_MAIN_SERVICE, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, UPLOAD_API_URL_TOKEN, USER_API_URL_TOKEN, USER_MAPPING_TOKEN, USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from "./repository.tokens";
import { HttpClient } from "@angular/common/http";
import { StrapiAutenticationService } from "../services/impl/authentication/strapi-autentication.service";
import { StrapiAuthMappingService } from "../services/impl/authentication/strapi-auth-mapping.service";
import { CryptoBaseService } from "../services/impl/crypto/CryptoBase.service";
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






function createCoinGekorepository(httpclient:HttpClient,apiurltoken:string,mapping:ICryptoBaseMapping<any>,cryptoken:string){
    return new CoinGekoRepository(httpclient,apiurltoken,mapping,cryptoken)
}

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

function createStrapiRepository(httpclient:HttpClient,apiurltoken:string,mapping:IUserBaseMapping<any>){
    return new StrapiUserRepository(httpclient,apiurltoken,mapping)
}

export const userfactoryservice:FactoryProvider={
    provide:USER_REPOSITORY_TOKEN,
    deps:[BACKEND_TOKEN,HttpClient,USER_API_URL_TOKEN,USER_MAPPING_TOKEN,FIREBASE_MAIN_SERVICE],
    useFactory:(backend:string,httpclient:HttpClient,apiurltoken:string,mapping:IUserBaseMapping<any>,firebasemainservice:IFirebaseMainService)=>{

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
          return new FirebaseUserRepository(httpclient,apiurltoken,mapping,firebasemainservice)
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }



    }
}


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

export const UserServiceFactory:FactoryProvider = {
  provide: USER_SERVICE_TOKEN,
  useFactory: (backend:string,repository:IUserbaseRepositoy<any>,authentication:IAuthenticationService) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new UserStrapiService(repository,authentication);
      case 'firebase':
        return new UserFirebaseService(repository,authentication);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
deps: [BACKEND_TOKEN,USER_REPOSITORY_TOKEN,AUTH_TOKEN]
};

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