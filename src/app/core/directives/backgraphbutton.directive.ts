import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBackgraphbutton]',
  standalone: true
})

export class BackgraphbuttonDirective implements OnChanges {

  @Input() 
  xd!: string;

  constructor(private elementref:ElementRef, private render:Renderer2) { }

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges): void {

    //const negativeColor = 'var(--ion-color-negativenew)';
    //const positiveColor = 'var(--ion-color-positivenew)';
    
    
  }

}
