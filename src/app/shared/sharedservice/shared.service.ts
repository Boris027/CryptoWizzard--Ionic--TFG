import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Shared service providing common utilities across the app.
 * 
 * Currently includes a method to display localized Ionic toasts.
 */
export class SharedService {
  constructor(private toastCtrl: ToastController, private translate: TranslateService) { }

  /**
   * Displays a toast notification with a specified color and message.
   * The toast includes a localized "Close" button.
   * 
   * @param color - The color of the toast (e.g., 'success', 'danger', 'warning')
   * @param message - The message to display in the toast
   */
  async showToast(color: string, message: string) {
    const toast = await this.toastCtrl.create({
      message: message !== "" ? message : message,
      duration: 2000,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: this.translate.instant("COMMON.CLOSE"),
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}