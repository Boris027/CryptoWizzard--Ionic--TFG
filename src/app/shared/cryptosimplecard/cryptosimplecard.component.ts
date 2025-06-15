import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';

@Component({
  selector: 'app-cryptosimplecard',
  templateUrl: './cryptosimplecard.component.html',
  styleUrls: ['./cryptosimplecard.component.scss'],
})
/**
 * A simple card component to display basic cryptocurrency info.
 * Provides an optional delete button and emits an event with the crypto id when delete is triggered.
 */
export class CryptosimplecardComponent {
  constructor() { }

  @Input() crypto!:BasicCrypto
  @Input() delete:boolean=false
  @Output() emmiter:EventEmitter<string>=new EventEmitter()

  /**
   * Handles the delete button click event, stops event propagation and emits the crypto id.
   * @param event The DOM event triggered by clicking delete.
   */
  deleteCrypto(event: Event) {
    event.stopPropagation()    
    this.emmiter.emit(this.crypto.id)
  }
}