import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TranslationService } from '../../../core/services/impl/translation.service';
import { IAuthenticationService } from '../../../core/services/interfaces/authentication/authentication.interface';
import { AUTH_TOKEN } from '../../../core/repositories/repository.tokens';
import { User } from '../../../core/models/User.model';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private subscriptions:Subscription[]=[]
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private router:Router,
    private alertcontroller:AlertController,
    private shared:SharedService
  ) { 
    

  }



  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }


  login(event:any) {
    this.subscriptions.push(this.authservice.Login(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.LOGIN.LOGINSUCCESSFUL"))
          this.router.navigate(['/splash']);
        },error:(err)=>{
        console.log(err)
        this.shared.showToast("danger",err+"")
      }
    }))
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
            }
          },
        },
      ],
    });

    await alert.present();
  }

 
  ngOnInit() {
  }

  

  

  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

}
