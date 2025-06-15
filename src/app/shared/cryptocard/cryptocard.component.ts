import { Component, Input } from '@angular/core';
import { AdvancedCrypto } from 'src/app/core/models/Crypto.model';

@Component({
  selector: 'app-cryptocard',
  templateUrl: './cryptocard.component.html',
  styleUrls: ['./cryptocard.component.scss'],
})
/**
 * Component that displays a visual card for a cryptocurrency, showing information
 * based on the `AdvancedCrypto` model and the selected display `currency`.
 */
export class CryptocardComponent {
  @Input() crypto!:AdvancedCrypto;
  @Input() currency!:string
  percent=10

  /**
   * Creates an instance of CryptocardComponent.
   */
  constructor() { }
}