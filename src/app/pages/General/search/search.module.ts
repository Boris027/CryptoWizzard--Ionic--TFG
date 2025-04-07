import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    ScrollingModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
