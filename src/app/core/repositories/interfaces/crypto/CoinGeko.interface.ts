import { Observable } from "rxjs";
import { AdvancedCrypto, BasicCrypto } from "../../../models/Crypto.model";
import { ICryptoBase } from "./CryptoBase.interface";

export interface ICoinGeko extends ICryptoBase<BasicCrypto>{


}