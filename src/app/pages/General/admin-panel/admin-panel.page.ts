import { Component, OnInit,Inject } from '@angular/core';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  public users: User[] = []
  private usersLimit = 10;
  private token = '';

  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserbaseService<User>,
  ){
    this.authservice.setmenu(true)
  }

  ngOnInit() {
    this.loadMoreUsers();
  }

  loadMoreUsers(notify: HTMLIonInfiniteScrollElement | null = null) {
    this.userService.AdminGetUsersPagination(this.token, 0, this.usersLimit).subscribe(usersResponse=>{
      if (usersResponse[0]) {
        usersResponse.forEach((it: User) => this.users.push(it))
        this.token = usersResponse[0].id;
      }
      notify?.complete()
    });
  }

  editUser(user: any) {
    // TODO
  }
  
  deleteUser(user: any) {
    // TODO
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    this.loadMoreUsers($event.target)
  }
}