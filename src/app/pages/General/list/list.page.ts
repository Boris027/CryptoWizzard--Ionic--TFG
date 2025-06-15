import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BasicList, CryptoList } from 'src/app/core/models/CryptoList.model';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { ListformularyComponent } from 'src/app/shared/listformulary/listformulary.component';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

/**
 * ListPage component.
 * 
 * Manages user's lists: displaying, creating, updating and deleting lists.
 * Uses modal dialogs for create/update forms and alerts for delete confirmation.
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  /**
   * Creates an instance of ListPage.
   * @param modalController Controller to open modals
   * @param authservice Authentication service to get user token and session info
   * @param userservice User service to fetch and modify user data
   * @param alertController Controller to create confirmation alerts
   * @param translate Translation service for i18n strings
   * @param shared Shared service for utilities (e.g. toasts)
   */
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

  /**
   * Lifecycle hook called once, initializes token and loads user's lists.
   */
  ngOnInit() {
    this.token=this.authservice.getToken();

    this.subscriptions.push(this.userservice.GetListFromUser().subscribe({
      next:(value)=>{
          this.lists=value
      },
    }))
  }

  /**
   * Opens modal to create a new list.
   */
  createlist(){
    this.presentModal("Create")
  }

  /**
   * Opens modal to update an existing list by id.
   * @param id Id of the list to update
   */
  updatelist(id:string){
    let lista=this.lists.find(c=>c.id==id+"")
    this.presentModal("Update",lista)
  }

  /**
   * Presents the ListformularyComponent modal for creating or updating a list.
   * Handles the modal dismissal and triggers API calls accordingly.
   * @param type "Create" or "Update"
   * @param list Optional list object for update mode
   */
  async presentModal(type:string,list?:BasicList) {
    const modal = await this.modalController.create({
      component: ListformularyComponent,
      componentProps: { updateOrCreate: type,list:list}
    });

    await modal.present();

    const { data  } = await modal.onWillDismiss();
    if (data) {
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

  /**
   * Deletes a list by id with API call and updates local array on success.
   * @param id Id of the list to delete
   */
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

  /**
   * Handles events from UI for list update or delete actions.
   * @param event Object containing the action type and list id
   */
  getdata(event: {type:string,id:string}) {
    if(event.type=="update"){
      this.updatelist(event.id)
    }else if(event.type=="delete"){
      this.alertdelete(event.id)
    }
  }

  /**
   * Shows a confirmation alert before deleting a list.
   * @param id Id of the list to confirm deletion
   */
  async alertdelete(id:string) {
    const alert = await this.alertController.create({
      header: this.translate.instant("LISTS.DELETELIST"),
      message: this.translate.instant("LISTS.DELETELISTQUESTION"),
      buttons: [
        {
          text: this.translate.instant("COMMON.CANCEL"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
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

  /**
   * Lifecycle hook called when component is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }
}