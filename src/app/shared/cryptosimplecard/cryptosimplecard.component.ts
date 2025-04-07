import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';

@Component({
  selector: 'app-cryptosimplecard',
  templateUrl: './cryptosimplecard.component.html',
  styleUrls: ['./cryptosimplecard.component.scss'],
})
export class CryptosimplecardComponent  implements OnInit {


  constructor() { }

  @Input() crypto!:BasicCrypto
  @Input() delete:boolean=false
  @Output() emmiter:EventEmitter<string>=new EventEmitter()

  ngOnInit() {}

  deleteCrypto(event: Event) {
    event.stopPropagation()    
    this.emmiter.emit(this.crypto.id)
  }

}
