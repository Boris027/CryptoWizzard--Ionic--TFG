import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListcontentPageRoutingModule } from './listcontent-routing.module';

import { ListcontentPage } from './listcontent.page';
import { SharedModule } from "../../../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListcontentPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
],
  declarations: [ListcontentPage]
})
export class ListcontentPageModule {}
