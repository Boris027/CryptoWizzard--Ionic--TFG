import { AdvancedCrypto, BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";
import { ICryptoBaseMapping } from "../../interfaces/crypto/CryptoBaseMapping.interface";
import { Injectable } from "@angular/core";

/**
 * Interface representing the detailed cryptocurrency data structure
 * as received from the CoinGecko API.
 */
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

/**
 * Interface representing a basic crypto object with minimal information
 * as returned from the CoinGecko API.
 */
export interface BasiCryptoFromApi{
    id:string,
    name:string,
    symbol:string
}

/**
 * Interface representing historical price and volume data
 * as provided by the CoinGecko API.
 */
export interface PricesCryptoFromApi {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
}

/**
 * Mapping class that transforms raw API data from CoinGecko
 * into application-specific models.
 */
@Injectable({
    providedIn: 'root'
})
export class CoinGekoMapping implements ICryptoBaseMapping<BasicCrypto> {
    /**
     * Maps paginated API data into an array of AdvancedCrypto models.
     * 
     * @param data Raw API response containing crypto market data.
     * @returns Array of AdvancedCrypto objects with selected fields.
     */
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

    /**
     * Maps API data into a list of BasicCrypto models.
     * 
     * @param data Raw API response containing minimal crypto info.
     * @returns Array of BasicCrypto objects.
     */
    getAllList(data:any):BasicCrypto[]{
        let list=data.map((c: any) => ({
            id:c.id,
            name:c.name,
            symbol:c.symbol
        }))
        return list
    }

    /**
     * Maps historical price data from the API into CryptoGraphPrice models.
     * 
     * @param data Raw API response containing price history arrays.
     * @returns Array of CryptoGraphPrice objects with price and date.
     */
    getPriceList(data: any): CryptoGraphPrice[] {
        let list=data.prices.map((c: any) => ({
            price:c[1],
            date:c[0]
        }))
        return list
    }
}