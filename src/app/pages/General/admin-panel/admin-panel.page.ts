import { Component, Inject } from '@angular/core';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { BasicUser, User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage {
  public users: User[] = []
  private usersLimit = 15;
  private token = '';
  private actualUser: BasicUser = {id:'',email:'',username:'',img:'',gender:'',isAdmin:false};

  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService:IUserbaseService<User>,
    private translate: TranslateService,
    private shared:SharedService
  ){
    this.authservice.setmenu(true)
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
        usersResponse.filter((it: User) => it.id != this.actualUser.id).forEach((it: User) => this.users.push(it))
        this.token = usersResponse[usersResponse.length-1].id;
      }
      notify?.complete()
    });
  }

  editUser(user: any) {
    // TODO
  }
  
  deleteUser(userId: any) {
    this.userService.AdminDeleteUser('',userId).subscribe(()=>{
      this.shared.showToast("success",this.translate.instant("CRUDUSER.DELETEACCOUNTSUCCESSFUL"))
      this.loadUsers();
    })
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    this.loadMoreUsers($event.target)
  }
}