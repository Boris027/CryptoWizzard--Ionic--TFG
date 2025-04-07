import { Component, Input, OnInit } from '@angular/core';
import { AdvancedCrypto } from 'src/app/core/models/Crypto.model';

@Component({
  selector: 'app-cryptocard',
  templateUrl: './cryptocard.component.html',
  styleUrls: ['./cryptocard.component.scss'],
})
export class CryptocardComponent  implements OnInit {

  @Input() crypto!:AdvancedCrypto;
  @Input() currency!:string
  percent=10
  constructor() { }

  ngOnInit() {
    
  }

}
