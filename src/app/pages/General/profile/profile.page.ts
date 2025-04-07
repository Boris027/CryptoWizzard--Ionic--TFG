import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { BasicUser, User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/media/base-media.service';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {



  selectedCurrency: string="usd";
  user:BasicUser={id:"",email:"",username:"",img:"",gender:''}
  formularypassword: FormGroup;
  private subscriptions:Subscription[]=[]

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

  get password(){
    return this.formularypassword.controls['password'];
  }

  
  updatepassword() {
    this.userservice.updateuserdata({password:this.formularypassword.get('password')?.value}).subscribe({
      next:(value)=>{
          this.formularypassword.reset()
          console.log(value)
      },
    })
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

  ngOnInit() {
    

  }

  ionViewWillEnter(){
    this.subscriptions.push(this.userservice.GetBehaviourUser().subscribe({
      next:(value)=>{
          this.user=value
      },
    }))
  }

  onChange($event: string) {
    this.authservice.setCurrency($event)
  }


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



  async onFileChange(event: any) {
    const file = event.target.files[0];

    // Verifica si se ha seleccionado un archivo y es una imagen
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      // Lee el archivo y actualiza la imagen una vez cargada
      reader.onload = (e: any) => {
        this.user.img = e.target.result; // Actualiza la imagen con la nueva seleccionada
      };

      const blob = file;
      //de este no hace falta desuscribirse ya que lo hace solo al completarse
      const uploadedBlob = await lastValueFrom(this.mediaService.upload(blob))
      console.log(uploadedBlob)
      //de este no hace falta desuscribirse ya que lo hace solo al completarse
      await lastValueFrom(this.userservice.updateuserdata({image:uploadedBlob[0]}));
      console.log(blob)

      reader.readAsDataURL(file); // Lee el archivo como una URL base64
    }
  }

  update(event:any){
    this.subscriptions.push(this.userservice.updateuserdata(event).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("CRUDUSER.UPDATE.UPDATESUCCESSFULL"))
      },error:(err)=>{
        this.shared.showToast("danger",this.translate.instant("CRUDUSER.ERRORS.UPDATEFAILED"))
      },
    }))
    console.log(event)
  }

  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

}
