import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 * Directive that dynamically sets the text color of an element based on a numeric percentage value.
 * 
 * If the value is negative, the text color is set to the Ionic CSS variable `--ion-color-negativenew`.
 * If the value is zero or positive, the color is set to `--ion-color-positivenew`.
 * 
 * This is useful for visually indicating positive or negative percentages (e.g. in financial or performance dashboards).
 */
@Directive({
  selector: '[appColorpercent]',
  standalone: true
})
export class ColorpercentDirective implements OnChanges{
  /**
   * Numeric value used to determine the color of the text.
   * If negative, applies the negative color; otherwise, applies the positive color.
   */
  @Input() appColorpercent:number=0;

  /**
   * Creates an instance of the directive.
   * 
   * @param elementref Reference to the host DOM element.
   * @param render Renderer2 instance used to safely manipulate element styles.
   */
  constructor(private elementref:ElementRef, private render:Renderer2) { }

  /**
   * Lifecycle hook that is called when any data-bound property changes.
   * 
   * @param changes The changed properties of the directive.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(this.appColorpercent<0){
      this.render.setStyle(this.elementref.nativeElement,'color','var(--ion-color-negativenew)')
    }else{
      this.render.setStyle(this.elementref.nativeElement,'color','var(--ion-color-positivenew)')
    }
  }
}