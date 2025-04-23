import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import * as saveAs from 'file-saver';
import { BasicUser, User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { AdminFormularyComponent } from 'src/app/shared/admin-formulary/admin-formulary.component';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage {
  public users: BasicUser[] = [];
  private usersLimit = 15;
  private token = '';
  private actualUser: BasicUser = {id:'',email:'',username:'',img:'',gender:'',isAdmin:false};

  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService:IUserbaseService<User>,
    private modalController: ModalController,
    private translate: TranslateService,
    private shared:SharedService
  ){
    this.authservice.setmenu(true);
  }

  ionViewWillEnter() {
    this.userService.GetBehaviourUser().subscribe(value => {
      this.actualUser = value;
    });
    this.loadUsers();
  }

  loadUsers() {
    this.token = ''
    this.userService.AdminGetUsersPagination(this.token, 0, this.usersLimit).subscribe(usersResponse=>{
      if (usersResponse[0]) {
        this.users = usersResponse.filter((it: User) => it.id != this.actualUser.id);
        this.token = usersResponse[usersResponse.length-1].id;
      }
    });
  }

  loadMoreUsers(notify: HTMLIonInfiniteScrollElement | null = null) {
    this.userService.AdminGetUsersPagination(this.token, 0, this.usersLimit).subscribe(usersResponse=>{
      if (usersResponse[0]) {
        usersResponse.filter((it: BasicUser) => it.id != this.actualUser.id).forEach((it: BasicUser) => this.users.push(it));
        this.token = usersResponse[usersResponse.length-1].id;
      }
      notify?.complete();
    });
  }

  editUser(user: BasicUser) {
    this.presentModal(user);
  }
  
  deleteUser(userId: any) {
    this.userService.AdminDeleteUser('',userId).subscribe(()=>{
      this.shared.showToast("success",this.translate.instant("CRUDUSER.DELETEACCOUNTSUCCESSFUL"));
      this.loadUsers();
    });
  }

  downloadCsv() {
    this.userService.getUsersCsv().subscribe({
      next: (response: HttpResponse<Blob>) => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = this.extractFileName(contentDisposition) ?? this.translate.instant("ADMIN_PANEL.CSV_BUTTON.FILENAME");
        const blob = new Blob([response.body as BlobPart], {
          type: 'text/csv;charset=utf-8'
        });
        saveAs(blob, filename);
        this.shared.showToast('success',this.translate.instant('ADMIN_PANEL.CSV_BUTTON.SUCCESS'));
      },
      error: (err: unknown) => {
        this.shared.showToast('success',this.translate.instant('ADMIN_PANEL.CSV_BUTTON.ERROR'));
      }
    });
  }

  private extractFileName(header: string | null): string | null {
    if (!header) return null;
    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(header);
    return match ? match[1].replace(/['"]/g, '') : null;
  }

  async presentModal(user:BasicUser) {
    const modal = await this.modalController.create({
      component: AdminFormularyComponent,
      componentProps: { user: user }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data) {
      console.log(data);
      this.userService.AdminUpdateUser('', user.id, data.username, data.gender, data.isAdmin).subscribe({
        next:(value)=>{
          this.shared.showToast('success',this.translate.instant('CRUDUSER.UPDATE.UPDATESUCCESSFULL'));
            this.loadUsers();
        },
        error:(err)=>{
            this.shared.showToast('danger',this.translate.instant('CRUDUSER.ERRORS.UPDATEFAILED'))
        },
      })
    }
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    this.loadMoreUsers($event.target);
  }
}