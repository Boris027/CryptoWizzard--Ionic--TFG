import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicList } from 'src/app/core/models/CryptoList.model';

@Component({
  selector: 'app-listcrypto',
  templateUrl: './listcrypto.component.html',
  styleUrls: ['./listcrypto.component.scss'],
})
/**
 * Component to display a cryptocurrency list item.
 * 
 * Receives a `BasicList` object as input and emits events for
 * delete and update actions.
 * 
 * Emits an event with an object containing:
 * - `type`: action type ('delete' or 'update')
 * - `id`: identifier of the list item as a string
 */
export class ListcryptoComponent {
  constructor() { }
  @Input() list!:BasicList
  @Output() eventemiter= new EventEmitter<{type:string,id:string}>();

  /**
   * Emits a delete event for this list item.
   * Stops the event propagation to prevent parent handlers.
   * @param event Mouse or UI event triggering the delete action
   */
  deletethis(event: Event){
    event.stopPropagation();
    this.eventemiter.emit({type:"delete",id:this.list.id+""})
  }

  /**
   * Emits an update event for this list item.
   * Stops the event propagation to prevent parent handlers.
   * @param event Mouse or UI event triggering the update action
   */
  modify(event: Event){
    event.stopPropagation();
    this.eventemiter.emit({type:"update",id:this.list.id+""})
  }
}