import { Component, Inject, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
/**
 * RegisterPage allows users to create a new account and select their preferred language.
 * It provides form submission, language switching, and password visibility toggling functionality.
 */
export class RegisterPage {
  private subscriptions:Subscription[]=[]

  /**
   * Constructor for dependency injection.
   *
   * @param router Angular Router for navigation.
   * @param authservice The authentication service (injected via token).
   * @param fbbuilder Angular FormBuilder (currently unused).
   * @param translationService Custom translation service to manage app language.
   * @param shared SharedService for showing toast messages.
   * @param alertcontroller Ionic AlertController for showing language selection.
   * @param translate ngx-translate service for instant translations.
   */
  constructor(
    private router:Router,
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private fbbuilder: FormBuilder,
    private translationService: TranslationService,
    private shared:SharedService,
    private alertcontroller:AlertController,
    private translate: TranslateService
  ) { }

  /**
   * Changes the application language.
   *
   * @param lang The language code (e.g., 'en' or 'es').
   */
  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  /**
   * Submits the registration form.
   *
   * @param event Object containing form values.
   */
  register(event:any) {
    this.subscriptions.push(this.authservice.Register(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.REGISTER.REGISTERSUCCESSFUL"))
          this.router.navigate(['/splash'])
      },error:(err)=>{
        this.shared.showToast("danger",err)
      }
    }))
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  /**
   * Toggles the visibility of the password input field.
   */
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /**
   * Angular lifecycle hook to clean up subscriptions and avoid memory leaks.
   */
  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

  /**
   * Opens an alert dialog to allow the user to select a language.
   */
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
            }
          },
        },
      ],
    });
    await alert.present();
  }
}