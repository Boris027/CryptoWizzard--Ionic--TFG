import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BasicList, CryptoList } from 'src/app/core/models/CryptoList.model';

@Component({
  selector: 'app-listcrypto',
  templateUrl: './listcrypto.component.html',
  styleUrls: ['./listcrypto.component.scss'],
})
export class ListcryptoComponent  implements OnInit {

  constructor(
  ) { }
  @Input() list!:BasicList
  @Output() eventemiter= new EventEmitter<{type:string,id:string}>();

  ngOnInit() {
  }

  deletethis(event: Event){
    event.stopPropagation(); // esto detiene la propagación para que al darle clic al boton no se ejecute tambien aparte de el de eliminar, el de navegar
    this.eventemiter.emit({type:"delete",id:this.list.id+""})
  }

  modify(event: Event){
    event.stopPropagation();
    this.eventemiter.emit({type:"update",id:this.list.id+""})
  }

}
