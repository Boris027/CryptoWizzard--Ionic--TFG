import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CryptoviewPageRoutingModule } from './cryptoview-routing.module';

import { CryptoviewPage } from './cryptoview.page';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from 'src/app/core/pipes/currency.pipe';
import { ButtonModule } from 'primeng/button';
import { ColorpercentDirective } from 'src/app/core/directives/colorpercent.directive';
import { PercentformaterPipe } from 'src/app/core/pipes/percentformater.pipe';
import { BackgraphbuttonDirective } from 'src/app/core/directives/backgraphbutton.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CryptoviewPageRoutingModule,
    TranslateModule.forChild(),
    CurrencyPipe,
    PercentPipe,
    PercentformaterPipe,
    ColorpercentDirective,
    BackgraphbuttonDirective
],
  declarations: [CryptoviewPage],
})
export class CryptoviewPageModule {}
