import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorpercent]',
  standalone: true
})
export class ColorpercentDirective implements OnChanges{

  @Input() appColorpercent:number=0;

  constructor(private elementref:ElementRef, private render:Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {

    //const negativeColor = 'var(--ion-color-negativenew)';
    //const positiveColor = 'var(--ion-color-positivenew)';
    
    if(this.appColorpercent<0){
      this.render.setStyle(this.elementref.nativeElement,'color','var(--ion-color-negativenew)')
    }else{
      this.render.setStyle(this.elementref.nativeElement,'color','var(--ion-color-positivenew)')

    }
    
    

  }

}
