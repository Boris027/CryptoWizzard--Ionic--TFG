import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Component that allows selecting a custom gender with support for
 * internationalization using ngx-translate.
 * 
 * Implements ControlValueAccessor to integrate with Angular reactive
 * and template-driven forms.
 * 
 * Listens to language change events to update options dynamically.
 */
@Component({
  selector: 'app-custom-gender',
  templateUrl: './custom-gender.component.html',
  styleUrls: ['./custom-gender.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomGenderComponent),
    multi: true
  }]
})
export class CustomGenderComponent  implements OnInit,ControlValueAccessor,OnDestroy {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  isDisabled = false;
  private languageChangeSubscription: Subscription | undefined;

  constructor(
    private translate:TranslateService
  ) { }
  
  options = [
    {value:"male", name: this.translate.instant("CRUDUSER.REGISTER.MALE")},
    {value:'female', name: this.translate.instant("CRUDUSER.REGISTER.FEMALE")},
    {value:'other',name: this.translate.instant("CRUDUSER.REGISTER.OTHER")}
  ]

  /**
   * Initializes subscription to detect language changes and update options.
   */
  ngOnInit(): void {
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateOptions();
      let find=this.options.find(c=>c.value==this.selectedoption.value)
      this.selectedoption=find
    });
  }

  selectedoption:any=''

  /**
   * Updates the options with the current translations.
   */
  private updateOptions(): void {
    this.options = [
      { value: 'male', name: this.translate.instant('CRUDUSER.REGISTER.MALE') },
      { value: 'female', name: this.translate.instant('CRUDUSER.REGISTER.FEMALE') },
      { value: 'other', name: this.translate.instant('CRUDUSER.REGISTER.OTHER') }
    ];
  }

  /**
   * Writes a new value to the component from the form control.
   * @param obj Gender value ('male', 'female', 'other')
   */
  writeValue(obj: string): void {
    let find=this.options.find(c=>c.value==obj)
    this.selectedoption=find
  }

  /**
   * Registers the callback function to notify value changes.
   * @param fn Callback that receives the new value
   */
  registerOnChange(fn: any): void {
    this.onChange=fn
  }

  /**
   * Registers the callback function to notify that the field was touched.
   * @param fn Callback with no parameters
   */
  registerOnTouched(fn: any): void {
    this.onTouched=fn
  }

  /**
   * Changes the enabled/disabled state of the component.
   * @param isDisabled Whether the component should be disabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled=isDisabled
  }

  /**
   * Handles the change of the selected option by the user.
   * Notifies the form control about the change.
   * @param value Selected option
   */
  onOptionChange(value: any): void {
    this.selectedoption = value;
    this.onChange(value);  
  }

  /**
   * Lifecycle hook that cleans up subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();  
    }
  }
}