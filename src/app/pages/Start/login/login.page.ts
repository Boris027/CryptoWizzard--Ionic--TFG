import { Component, Inject } from '@angular/core';
import { TranslationService } from '../../../core/services/impl/translation.service';
import { IAuthenticationService } from '../../../core/services/interfaces/authentication/authentication.interface';
import { AUTH_TOKEN } from '../../../core/repositories/repository.tokens';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
/**
 * LoginPage is responsible for handling user authentication and language selection.
 * It includes a login form and a language switcher modal (alert).
 */
export class LoginPage {
  private subscriptions:Subscription[]=[]

  /**
   * Constructor for injecting required services.
   *
   * @param authservice The authentication service (injected with token).
   * @param translationService Custom service to manage language selection.
   * @param translate Angular ngx-translate service.
   * @param router Angular Router for navigation.
   * @param alertcontroller Ionic AlertController for dialogs.
   * @param shared SharedService to show toast messages.
   */
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private router:Router,
    private alertcontroller:AlertController,
    private shared:SharedService
  ) { }

  /**
   * Changes the application language.
   *
   * @param lang Language code (e.g., 'en', 'es').
   */
  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  /**
   * Logs in a user using form input and navigates to splash page on success.
   *
   * @param event Object containing login form data (typically from (ngSubmit)).
   */
  login(event:any) {
    this.subscriptions.push(this.authservice.Login(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.LOGIN.LOGINSUCCESSFUL"))
          this.router.navigate(['/splash']);
        },error:(err)=>{
        this.shared.showToast("danger",err+"")
      }
    }))
  }

  /**
   * Presents a modal allowing the user to select their preferred language.
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

  /**
   * Angular lifecycle hook.
   * Unsubscribes from all active subscriptions to prevent memory leaks.
   */
  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }
}