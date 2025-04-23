import { InjectionToken } from "@angular/core";
import { IAuthenticationService } from "../services/interfaces/authentication/authentication.interface";
import { IAuthenticationMapping } from "../services/interfaces/authentication/auth-mapping.interface";
import { ICryptobaseService } from "../services/interfaces/crypto/Crypto-base-service.interface";
import { BasicCrypto } from "../models/Crypto.model";
import { ICryptoBase } from "./interfaces/crypto/CryptoBase.interface";
import { ICryptoBaseMapping } from "./interfaces/crypto/CryptoBaseMapping.interface";
import { IUserbaseService } from "../services/interfaces/user/User-base-service.interface";
import { IUserbaseRepositoy } from "./interfaces/user/User-base.interface";
import { IUserBaseMapping } from "./interfaces/user/UserBaseMapping.interface";
import { IFirebaseMainService } from "../services/interfaces/firebasemain.service.interface";


export const BACKEND_TOKEN=new InjectionToken<string>('BACKEND_TOKEN')


//url
export const USER_API_URL_TOKEN=new InjectionToken<string>('PEOPLE_API_URL_TOKEN')
export const LOGIN_API_URL_TOKEN=new InjectionToken<string>('LOGIN_API_URL_TOKEN')
export const REGISTER_API_URL_TOKEN=new InjectionToken<string>('REGISTER_API_URL_TOKEN')
export const AUTENTICATION_URL_TOKEN = new InjectionToken<string>('AUTENTICATION_URL_TOKEN');


//criptomonedas
export const CRYPTO_MAPPING_TOKEN=new InjectionToken<ICryptoBaseMapping<any>>('CRYPTO_MAPPING_TOKEN')
export const CRYPTO_API_URL_TOKEN=new InjectionToken<string>('CRYPTO_API_URL_TOKEN')
export const CRYPTO_SERVICE_TOKEN=new InjectionToken<ICryptobaseService<any>>("CRYPTO_SERVICE_TOKEN")
export const CRYPTO_REPOSITORY_TOKEN=new InjectionToken<ICryptoBase<any>>("CRYPTO_REPOSITORY_TOKEN")
export const CRYPTOTOKEN_TOKEN=new InjectionToken<string>("CRYPTOTOKEN_TOKEN")

//usuario
export const USER_SERVICE_TOKEN=new InjectionToken<IUserbaseService<any>>('USER_SERVICE_TOKEN')
export const USER_REPOSITORY_TOKEN=new InjectionToken<IUserbaseRepositoy<any>>('USER_REPOSITORY_TOKEN')
export const USER_MAPPING_TOKEN=new InjectionToken<IUserBaseMapping<any>>('USER_MAPPING_TOKEN')
export const USER_CSV_URL_TOKEN=new InjectionToken<IUserBaseMapping<any>>('USER_CSV_URL_TOKEN')

//autenticación
export const AUTH_TOKEN = new InjectionToken<IAuthenticationService>('AUTH_TOKEN');
export const AUTH_MAPPING_TOKEN = new InjectionToken<IAuthenticationMapping>('AUTH_MAPPING_TOKEN');

//media
export const MEDIA_TOKEN = new InjectionToken<string>('UPLOAD_API_URL_TOKEN');
export const UPLOAD_API_URL_TOKEN = new InjectionToken<string>('UPLOAD_API_URL_TOKEN');

//firebase
export const FIREBASE_MAIN_SERVICE = new InjectionToken<IFirebaseMainService>('FIREBASE_MAIN_SERVICE');
export const FIREBASE_CONFIG_TOKEN = new InjectionToken<any>('FIREBASE_CONFIG_TOKEN');
export const FIREBASE_COLLECTION_TOKEN = new InjectionToken<string>('FIREBASE_COLLECTION_TOKEN');