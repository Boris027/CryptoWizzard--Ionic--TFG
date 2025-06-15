import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { BasicUser, User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/media/base-media.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

/**
 * Component to view and edit the current user's profile,
 * including updating password, profile image, and selected currency.
 * Also provides the ability to delete the user account.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  selectedCurrency: string="usd";
  user:BasicUser={id:"",email:"",username:"",img:"",gender:'',isAdmin:false}
  formularypassword: FormGroup;
  private subscriptions:Subscription[]=[]

  /**
   * Component constructor.
   * Injects necessary services such as authentication, user service, form builder, translation, routing, alert controller, media service, and shared services.
   *
   * @param authservice Authentication service (injected with token).
   * @param userservice User service for user operations (injected with token).
   * @param fbbuilder Form builder for reactive forms.
   * @param translate Translation service for internationalization.
   * @param router Router service for navigation.
   * @param alertcontroller Ionic alert controller.
   * @param mediaService Media handling service (image upload).
   * @param shared Shared service for displaying toasts/messages.
   */
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userservice:IUserbaseService<User>,
    private fbbuilder: FormBuilder,
    private translate: TranslateService,
    private router:Router,
    private alertcontroller:AlertController,
    private mediaService:BaseMediaService,
    private shared:SharedService
  ) { 
    this.authservice.setmenu(true)
    this.selectedCurrency=this.authservice.getCurrency()

    this.formularypassword = this.fbbuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  /**
   * Getter to access the password control of the reactive form.
   */
  get password(){
    return this.formularypassword.controls['password'];
  }

  /**
   * Updates the user's password via the user service.
   * Resets the form on successful update.
   */
  updatepassword() {
    this.userservice.updateuserdata({password:this.formularypassword.get('password')?.value}).subscribe({
      next:(value)=>{
          this.formularypassword.reset()
      },
    })
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  /**
   * Toggles the visibility of the password field, changing the input type and associated icon.
   */
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

  /**
   * Ionic lifecycle hook triggered each time the view is about to enter.
   * Subscribes to user data updates and refreshes the profile information.
   */
  ionViewWillEnter(){
    this.subscriptions.push(this.userservice.GetBehaviourUser().subscribe({
      next:(value)=>{
          this.user=value
      },
    }))
  }

  /**
   * Changes the selected currency for the application and updates the authentication service.
   *
   * @param event New selected currency.
   */
  onChange($event: string) {
    this.authservice.setCurrency($event)
  }

  /**
   * Displays a confirmation dialog for account deletion.
   * If confirmed, calls the service to delete the account, shows a toast, logs out, and navigates to the splash page.
   */
  async deleteaccount(){
    const alert=await this.alertcontroller.create({
      header:this.translate.instant("PROFILE.DELETEACCOUNTQUESTION"),
      buttons:[{
        text:this.translate.instant("COMMON.YES"),
        handler:()=>{
          this.subscriptions.push(this.authservice.Deleteuser(this.authservice.getToken(),this.authservice.getId()).subscribe({
            next:(value)=>{
              this.shared.showToast("success",this.translate.instant("CRUDUSER.DELETEACCOUNTSUCCESSFUL"))
              this.authservice.Logout()
              this.router.navigate(['/splash'])
            },
            error:(err)=>{
              this.shared.showToast("danger",this.translate.instant("CRUDUSER.ERRORS.DELETEACCOUNTFAILED"))
            },
          }))
        },
      },{
        text:this.translate.instant("COMMON.NO"),
        handler:()=>{
          
        }
      }]
    })
    alert.present()
  }

  /**
   * Handles the profile image file change event.
   * Validates the selected file, reads it as base64 for preview,
   * uploads the image to the server, and updates the user profile.
   *
   * @param event File input change event.
   */
  async onFileChange(event: any) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.user.img = e.target.result;
      };

      const blob = file;
      const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob))
      await lastValueFrom(this.userservice.updateuserdata({image:uploadedBlob[0]}));

      reader.readAsDataURL(file);
    }
  }

  /**
   * Updates the user data with the provided event data.
   * Displays success or error toast messages accordingly.
   *
   * @param event Object with user data fields to update.
   */
  update(event:any){
    this.subscriptions.push(this.userservice.updateuserdata(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.UPDATE.UPDATESUCCESSFULL"))
      },error:(err)=>{
        this.shared.showToast("danger",this.translate.instant("CRUDUSER.ERRORS.UPDATEFAILED"))
      },
    }))
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Unsubscribes from all active subscriptions to prevent memory leaks.
   */
  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }
}