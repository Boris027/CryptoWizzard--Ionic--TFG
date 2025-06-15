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

/**
 * AdminPanelPage component.
 * 
 * This component manages the administration panel for user management,
 * including listing users with pagination, editing, deleting users,
 * and downloading user data as CSV.
 */
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

  /**
   * Creates an instance of AdminPanelPage.
   * @param authservice Authentication service for managing user auth and UI state.
   * @param userService User base service for managing user CRUD operations.
   * @param modalController Controller to open modals.
   * @param translate Translate service for internationalization.
   * @param shared Shared service for utility functions like toast messages.
   */
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService:IUserbaseService<User>,
    private modalController: ModalController,
    private translate: TranslateService,
    private shared:SharedService
  ){
    this.authservice.setmenu(true);
  }

  /**
   * Lifecycle event called when the page is about to enter and become active.
   * Fetches current user info and loads the first page of users.
   */
  ionViewWillEnter() {
    this.userService.GetBehaviourUser().subscribe(value => {
      this.actualUser = value;
    });
    this.loadUsers();
  }

  /**
   * Loads the first page of users, excluding the current authenticated user.
   */
  loadUsers() {
    this.token = ''
    this.userService.AdminGetUsersPagination(this.token, 0, this.usersLimit).subscribe(usersResponse=>{
      if (usersResponse[0]) {
        this.users = usersResponse.filter((it: User) => it.id != this.actualUser.id);
        this.token = usersResponse[usersResponse.length-1].id;
      }
    });
  }

  /**
   * Loads more users for infinite scrolling, appending to the current list.
   * @param notify The IonInfiniteScroll element to complete the loading event.
   */
  loadMoreUsers(notify: HTMLIonInfiniteScrollElement | null = null) {
    this.userService.AdminGetUsersPagination(this.token, 0, this.usersLimit).subscribe(usersResponse=>{
      if (usersResponse[0]) {
        usersResponse.filter((it: BasicUser) => it.id != this.actualUser.id).forEach((it: BasicUser) => this.users.push(it));
        this.token = usersResponse[usersResponse.length-1].id;
      }
      notify?.complete();
    });
  }

  /**
   * Opens a modal to edit the selected user.
   * @param user The user to edit.
   */
  editUser(user: BasicUser) {
    this.presentModal(user);
  }
  
  /**
   * Deletes a user by id.
   * @param userId The id of the user to delete.
   */
  deleteUser(userId: any) {
    this.userService.AdminDeleteUser('',userId).subscribe(()=>{
      this.shared.showToast("success",this.translate.instant("CRUDUSER.DELETEACCOUNTSUCCESSFUL"));
      this.loadUsers();
    });
  }

  /**
   * Downloads the user list as a CSV file.
   * Shows toast messages for success or error.
   */
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

  /**
   * Extracts the filename from the Content-Disposition header.
   * @param header The Content-Disposition header value.
   * @returns The extracted filename or null if not found.
   */
  private extractFileName(header: string | null): string | null {
    if (!header) return null;
    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(header);
    return match ? match[1].replace(/['"]/g, '') : null;
  }

  /**
   * Presents a modal with the AdminFormularyComponent for editing user data.
   * After the modal is dismissed, updates the user if changes were made.
   * @param user The user to edit.
   */
  async presentModal(user:BasicUser) {
    const modal = await this.modalController.create({
      component: AdminFormularyComponent,
      componentProps: { user: user }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data) {
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

  /**
   * Event handler for the Ionic infinite scroll event.
   * Loads more users when the user scrolls to the bottom.
   * @param event The infinite scroll event.
   */
  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    this.loadMoreUsers($event.target);
  }
}