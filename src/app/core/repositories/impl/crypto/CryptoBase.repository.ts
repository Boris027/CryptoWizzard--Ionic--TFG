import { Inject, Injectable } from "@angular/core";
import { BasicCrypto } from "../../../models/Crypto.model";
import { ICryptobaseService } from "../../../services/interfaces/crypto/Crypto-base-service.interface";
import { ICryptoBase } from "../../interfaces/crypto/CryptoBase.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN } from "../../repository.tokens";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";

@Injectable({
    providedIn: 'root'
})

export class CryptoBaseRepository<T extends BasicCrypto> implements ICryptoBase<T>{


    constructor(
        protected httpclient:HttpClient,
        @Inject(CRYPTO_API_URL_TOKEN) protected apiurl:string,
        @Inject(CRYPTO_MAPPING_TOKEN) protected mapping:ICryptoBaseMapping<T>,
        @Inject(CRYPTOTOKEN_TOKEN) protected cryptotoken:string
    ){
        
    }
    getPriceList(id: string, currency: string, days: string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    getAllPaginated(page: number, pageSize: number,currency:string): Observable<any> {
        throw new Error("Method not implemented.");
    }
    findbyId(id: string,currency:string): Observable<T> {
        throw new Error("Method not implemented.");
    }
    getAllSimple(): Observable<T[]> {
        throw new Error("Method not implemented.");
    }
    
}