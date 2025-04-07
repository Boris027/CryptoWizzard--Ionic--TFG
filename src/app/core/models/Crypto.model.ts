import { Model } from "./base.model";

export interface BasicCrypto extends Model{
    name:string,
    symbol:string,
}

export interface AdvancedCrypto extends BasicCrypto{
    image:string,
    currentPrice:number,
    pricechangepercent24horus?:number 
}

export interface CryptoGraphPrice{
    price:number,
    date:number
}