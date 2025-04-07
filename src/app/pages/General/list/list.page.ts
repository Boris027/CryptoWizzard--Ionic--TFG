import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { BasicList, CryptoList } from 'src/app/core/models/CryptoList.model';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { ListformularyComponent } from 'src/app/shared/listformulary/listformulary.component';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


  constructor(
    private modalController: ModalController,
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) public userservice:IUserbaseService<User>,
    private alertController: AlertController,
    private translate:TranslateService,
    private shared:SharedService
  ) { 
    this.authservice.setmenu(true)
  }
  token:string=""
  lists:BasicList[]=[]
  private subscriptions:Subscription[]=[]
  ngOnInit() {
    this.token=this.authservice.getToken();

    this.subscriptions.push(this.userservice.GetListFromUser().subscribe({
      next:(value)=>{
          this.lists=value
      },
    }))

      
  }

  createlist(){
    this.presentModal("Create")
  }

  updatelist(id:string){
    let lista=this.lists.find(c=>c.id==id+"")
    this.presentModal("Update",lista)
  }

  async presentModal(type:string,list?:BasicList) {
    const modal = await this.modalController.create({
      component: ListformularyComponent,
      componentProps: { updateOrCreate: type,list:list}
    });

    await modal.present();

    const { data  } = await modal.onWillDismiss();
    if (data) {
      console.log(data)
      if(type=="Create"){
        this.subscriptions.push(this.userservice.addlistToUser(data).subscribe({
          next:(value)=>{
            this.shared.showToast("success",this.translate.instant("LISTS.LISTCREATEDSUCCESSFUL"))
            this.lists.push(value as CryptoList)
          },error:(err)=>{
            this.shared.showToast("danger",this.translate.instant("LISTS.LISTCREATIONFAILED"))
          },
        }))
      }else if(type=="Update"){
        this.subscriptions.push(this.userservice.updatelistFromUser(data).subscribe({
          next:(value)=>{
              this.shared.showToast("success",this.translate.instant("LISTS.LISTMODIFIEDSUCCESSFUL"))
              let valuexd=this.lists.findIndex(c=>c.id==value.id)
              this.lists[valuexd]=value 
          },
          error:(err)=>{
              this.shared.showToast("danger",this.translate.instant("LISTS.LISTMODIFICATIONFAILED"))
          },
        }))
      }
      
    }
  }

  deletelist(id:string){
    this.subscriptions.push(this.userservice.removelistFromUser(id).subscribe({
      next:(value)=>{
          this.shared.showToast("success",this.translate.instant("LISTS.LISTDELETEDSUCCESSFUL"))
          let index=this.lists.findIndex(c=>c.id==id+"")
          this.lists.splice(index,1)
      },
      error:(err)=>{
        this.shared.showToast("danger",this.translate.instant("LISTS.LISTDELETIONFAILED"))

      },
    }))
  }


  getdata(event: {type:string,id:string}) {
    //console.log('Evento recibido:', event);

    if(event.type=="update"){
      this.updatelist(event.id)
    }else if(event.type=="delete"){
      this.alertdelete(event.id)
    }
    
  }

  

  async alertdelete(id:string) {
    const alert = await this.alertController.create({
      header: this.translate.instant("LISTS.DELETELIST"),
      message: this.translate.instant("LISTS.DELETELISTQUESTION"),
      buttons: [
        {
          text: this.translate.instant("COMMON.CANCEL"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           //console.log('Cancelado');
          }
        },
        {
          text: this.translate.instant("COMMON.DELETE"),
          handler: () => {
            this.deletelist(id)
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

}
