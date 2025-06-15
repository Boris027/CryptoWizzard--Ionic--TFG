import { Inject, Injectable } from "@angular/core";
import { CryptoBaseRepository } from "./CryptoBase.repository";
import { AdvancedCrypto, BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN } from "../../repository.tokens";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";

/**
 * Repository implementation for fetching cryptocurrency data from the CoinGecko API.
 * 
 * Extends the base crypto repository to provide specific HTTP requests and data mapping
 * for advanced and basic crypto information, as well as price history data.
*/
@Injectable({
    providedIn: 'root'
})
export class CoinGekoRepository extends CryptoBaseRepository<BasicCrypto>{
    /**
     * Creates an instance of CoinGekoRepository.
     * 
     * @param httpclient Angular HttpClient used for HTTP requests.
     * @param apiurl Base URL of the CoinGecko API injected via token.
     * @param mapping Mapping strategy for transforming API responses to model objects.
     * @param cryptotoken API key or token for authenticating requests.
    */
    constructor(   
        httpclient:HttpClient,
        @Inject(CRYPTO_API_URL_TOKEN) apiurl:string,
        @Inject(CRYPTO_MAPPING_TOKEN) mapping:ICryptoBaseMapping<BasicCrypto>,
        @Inject(CRYPTOTOKEN_TOKEN) cryptotoken:string
    ){
        super(
            httpclient,
            apiurl,
            mapping,
            cryptotoken
        );
    }

    /**
     * Fetches a paginated list of advanced cryptocurrency data.
     * 
     * @param page The page number to fetch.
     * @param pageSize Number of items per page.
     * @param currency The currency code (e.g., "usd", "eur") for price conversion.
     * @returns Observable emitting an array of AdvancedCrypto objects.
    */
    override getAllPaginated(page: number, pageSize: number,currency:string): Observable<AdvancedCrypto[]> {
        return this.httpclient.get(this.apiurl+`/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllPaginated(res) 
            })
        )
    }

    /**
     * Finds a cryptocurrency by its ID.
     * 
     * @param id The unique identifier of the cryptocurrency.
     * @param currency The currency code for price conversion.
     * @returns Observable emitting a BasicCrypto object for the requested ID.
    */
    override findbyId(id: string,currency:string): Observable<BasicCrypto> {
        return this.httpclient.get(this.apiurl+`/coins/markets?vs_currency=${currency}&ids=${id}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllPaginated(res) 
            })
        )
    }

    /**
     * Fetches a simple list of all available cryptocurrencies.
     * 
     * @returns Observable emitting an array of BasicCrypto objects with minimal data.
    */
    override getAllSimple(): Observable<BasicCrypto[]> {
        return this.httpclient.get(this.apiurl+"/coins/list"+`?x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllList(res)
            })
        )
    }

    /**
     * Fetches historical price data for a cryptocurrency over a specified time period.
     * 
     * @param id The unique identifier of the cryptocurrency.
     * @param currency The currency code for price conversion.
     * @param days Number of days for the price history (e.g., "7", "30").
     * @returns Observable emitting an array of CryptoGraphPrice objects representing the price history.
    */
    override getPriceList(id: string, currency: string, days: string): Observable<CryptoGraphPrice[]> {
        return this.httpclient.get(this.apiurl+`coins/${id}/market_chart?vs_currency=${currency}&days=${days}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getPriceList(res)
            })
        )
    }
}