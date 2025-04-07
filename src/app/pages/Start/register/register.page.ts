import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AUTH_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  private subscriptions:Subscription[]=[]

  constructor(
  private router:Router,
  @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
  private fbbuilder: FormBuilder,
  private translationService: TranslationService,
  private shared:SharedService,
  private alertcontroller:AlertController,
  private translate: TranslateService) {
    
   }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }


  register(event:any) {
    console.log(event)
    this.subscriptions.push(this.authservice.Register(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.REGISTER.REGISTERSUCCESSFUL"))
          this.router.navigate(['/splash'])
      },error:(err)=>{
        console.log(err)
        this.shared.showToast("danger",err)
      }
    }))
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  

  

  

  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

  async present(){
    const alert = await this.alertcontroller.create({
      header: this.translate.instant('MAINMENU.SELECTLANGUAGE'), 
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('COMMON.ENGLISH'),
          value: 'en', 
          checked: this.translationService.getCurrentLanguage() === 'en', 
        },
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('COMMON.SPANISH'),
          value: 'es', 
          checked: this.translationService.getCurrentLanguage() === 'es',
        },
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'), 
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            if (data) {
              this.translationService.setLanguage(data)
              this.translate.use(data)
              console.log(data)
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
