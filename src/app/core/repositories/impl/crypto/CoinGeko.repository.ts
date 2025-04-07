import { Inject, Injectable } from "@angular/core";
import { CryptoBaseRepository } from "./CryptoBase.repository";
import { AdvancedCrypto, BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN } from "../../repository.tokens";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";
import { Token } from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})

export class CoinGekoRepository extends CryptoBaseRepository<BasicCrypto>{

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

    

    override getAllPaginated(page: number, pageSize: number,currency:string): Observable<AdvancedCrypto[]> {


        return this.httpclient.get(this.apiurl+`/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllPaginated(res) 
            })
        )

    }

    override findbyId(id: string,currency:string): Observable<BasicCrypto> {

        return this.httpclient.get(this.apiurl+`/coins/markets?vs_currency=${currency}&ids=${id}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllPaginated(res) 
            })
        )
    }


    override getAllSimple(): Observable<BasicCrypto[]> {
        return this.httpclient.get(this.apiurl+"/coins/list"+`?x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getAllList(res)
            })
        )
    }

    override getPriceList(id: string, currency: string, days: string): Observable<CryptoGraphPrice[]> {
        return this.httpclient.get(this.apiurl+`coins/${id}/market_chart?vs_currency=${currency}&days=${days}`+`&x_cg_demo_api_key=${this.cryptotoken}`).pipe(
            map(res=>{
                return this.mapping.getPriceList(res)
            })
        )
    }

    


    

}