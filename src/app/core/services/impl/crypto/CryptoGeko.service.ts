import { Inject, Injectable } from "@angular/core";
import { CryptoBaseService } from "./CryptoBase.service";
import { BasicCrypto } from "../../../models/Crypto.model";
import { CryptoCoinGeko } from "../../interfaces/crypto/CoinGeko-service.interface";
import { CRYPTO_REPOSITORY_TOKEN } from "../../../repositories/repository.tokens";
import { ICoinGeko } from "../../../repositories/interfaces/crypto/CoinGeko.interface";

/**
 * Service implementing the CryptoCoinGeko interface,
 * extending the generic CryptoBaseService with BasicCrypto type.
 * It uses an ICoinGeko repository injected via the CRYPTO_REPOSITORY_TOKEN.
 */
@Injectable({
    providedIn: 'root'
})
export class CryptoGeko extends CryptoBaseService<BasicCrypto> implements CryptoCoinGeko {
    /**
     * Creates an instance of CryptoGeko service.
     * @param repository - The ICoinGeko repository injected for crypto data operations.
     */
    constructor(
        @Inject (CRYPTO_REPOSITORY_TOKEN) repository:ICoinGeko
    ){
        super(repository);
    }
}