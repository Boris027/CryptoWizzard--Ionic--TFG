import { Inject, Injectable } from "@angular/core";
import { BasicCrypto } from "../../../models/Crypto.model";
import { ICryptoBase } from "../../interfaces/crypto/CryptoBase.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN } from "../../repository.tokens";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";

/**
 * Base repository class for cryptocurrency data fetching and mapping.
 * 
 * This abstract class provides the structure and dependencies needed to
 * interact with a crypto API. The actual data fetching methods must be
 * implemented by subclasses.
 * 
 * @template T The type of the crypto model, extending BasicCrypto.
 */
@Injectable({
    providedIn: 'root'
})
export class CryptoBaseRepository<T extends BasicCrypto> implements ICryptoBase<T>{
    /**
     * Creates an instance of CryptoBaseRepository.
     * 
     * @param httpclient Angular HttpClient for making HTTP requests.
     * @param apiurl The base API URL injected via token.
     * @param mapping Mapping interface to convert raw API data to models.
     * @param cryptotoken Token or API key used for authentication with the API.
     */
    constructor(
        protected httpclient:HttpClient,
        @Inject(CRYPTO_API_URL_TOKEN) protected apiurl:string,
        @Inject(CRYPTO_MAPPING_TOKEN) protected mapping:ICryptoBaseMapping<T>,
        @Inject(CRYPTOTOKEN_TOKEN) protected cryptotoken:string
    ){ }

    /**
     * Fetches historical price data for a cryptocurrency.
     * 
     * @param id Cryptocurrency ID.
     * @param currency Currency code for price conversion.
     * @param days Number of days for the price history.
     * @throws Error to indicate method is not implemented in the base class.
     * @returns Observable emitting price data.
     */
    getPriceList(id: string, currency: string, days: string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Fetches paginated cryptocurrency data.
     * 
     * @param page Page number.
     * @param pageSize Number of items per page.
     * @param currency Currency code for price conversion.
     * @throws Error to indicate method is not implemented in the base class.
     * @returns Observable emitting paginated data.
     */
    getAllPaginated(page: number, pageSize: number,currency:string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Finds a cryptocurrency by its ID.
     * 
     * @param id Cryptocurrency ID.
     * @param currency Currency code for price conversion.
     * @throws Error to indicate method is not implemented in the base class.
     * @returns Observable emitting the crypto model.
     */
    findbyId(id: string,currency:string): Observable<T> {
        throw new Error("Method not implemented.");
    }

    /**
   * Fetches a simple list of all cryptocurrencies.
   * 
   * @throws Error to indicate method is not implemented in the base class.
   * @returns Observable emitting an array of crypto models.
   */
    getAllSimple(): Observable<T[]> {
        throw new Error("Method not implemented.");
    }
}