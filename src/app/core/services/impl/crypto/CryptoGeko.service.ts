import { Inject, Injectable } from "@angular/core";
import { CryptoBaseService } from "./CryptoBase.service";
import { BasicCrypto } from "../../../models/Crypto.model";
import { CryptoCoinGeko } from "../../interfaces/crypto/CoinGeko-service.interface";
import { CRYPTO_REPOSITORY_TOKEN } from "../../../repositories/repository.tokens";
import { ICryptoBase } from "../../../repositories/interfaces/crypto/CryptoBase.interface";
import { ICoinGeko } from "../../../repositories/interfaces/crypto/CoinGeko.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CryptoGeko extends CryptoBaseService<BasicCrypto> implements CryptoCoinGeko {


    constructor(
        @Inject (CRYPTO_REPOSITORY_TOKEN) repository:ICoinGeko
    ){
        super(repository);
    }
    

}