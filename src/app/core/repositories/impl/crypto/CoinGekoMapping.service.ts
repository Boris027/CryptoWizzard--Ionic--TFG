import { Observable } from "rxjs";
import { AdvancedCrypto, BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";
import { Injectable } from "@angular/core";


export interface CryptoFromApi {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi: any
    last_updated: string
}

export interface BasiCryptoFromApi{
    id:string,
    name:string,
    symbol:string
}

export interface PricesCryptoFromApi {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
  }

@Injectable({
    providedIn: 'root'
})


export class CoinGekoMapping implements ICryptoBaseMapping<BasicCrypto> {
   


    getAllPaginated(data: any): AdvancedCrypto[] {
        let list=data.map((c: any) => ({
            id: c.id,
            name:c.name,
            image: c.image,
            symbol:c.symbol,
            currentPrice:c.current_price,
            pricechangepercent24horus:c.price_change_percentage_24h
        }));
        return list
    }

    getAllList(data:any):BasicCrypto[]{
        let list=data.map((c: any) => ({
            id:c.id,
            name:c.name,
            symbol:c.symbol
        }))
        return list
    }


    getPriceList(data: any): CryptoGraphPrice[] {
        let list=data.prices.map((c: any) => ({
            price:c[1],
            date:c[0]
        }))
        return list
    }


    
    
}