import { BasicCrypto } from "./Crypto.model"

export interface CryptoList{
    id:string,
    title:string,
    description:string
    cryptos:BasicCrypto[]
}

export interface BasicList{
    id:string,
    title:string,
    description:string
}