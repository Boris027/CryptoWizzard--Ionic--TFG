import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
  options=[ {value:"male", name: this.translate.instant("CRUDUSER.REGISTER.MALE")} , {value:'female', name: this.translate.instant("CRUDUSER.REGISTER.FEMALE")}
    ,{value:'other',name: this.translate.instant("CRUDUSER.REGISTER.OTHER")} ]
  

  ngOnInit(): void {
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateOptions();
      let find=this.options.find(c=>c.value==this.selectedoption.value)
      this.selectedoption=find
    });
  }

selectedoption:any=''
  private updateOptions(): void {
    this.options = [
      { value: 'male', name: this.translate.instant('CRUDUSER.REGISTER.MALE') },
      { value: 'female', name: this.translate.instant('CRUDUSER.REGISTER.FEMALE') },
      { value: 'other', name: this.translate.instant('CRUDUSER.REGISTER.OTHER') }
    ];
  }

  writeValue(obj: string): void {

    let find=this.options.find(c=>c.value==obj)
    this.selectedoption=find

  }
  registerOnChange(fn: any): void {
    this.onChange=fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched=fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled=isDisabled
  }

  

  onOptionChange(value: any): void {
    this.selectedoption = value;
    this.onChange(value);  
  }
  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();  
    }
  }
}
