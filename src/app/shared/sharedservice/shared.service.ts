import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastCtrl: ToastController, private translate: TranslateService) { }

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
