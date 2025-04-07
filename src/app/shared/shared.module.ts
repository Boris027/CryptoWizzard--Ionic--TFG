import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptocardComponent } from './cryptocard/cryptocard.component';
import { IonicModule } from '@ionic/angular';
import { CryptosimplecardComponent } from './cryptosimplecard/cryptosimplecard.component';
import { ListcryptoComponent } from './listcrypto/listcrypto.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListformularyComponent } from './listformulary/listformulary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '../core/pipes/currency.pipe';
import { PercentformaterPipe } from '../core/pipes/percentformater.pipe';
import { FormularyComponent } from './formulary/formulary.component';
import { RouterModule } from '@angular/router';
import { CustomGenderComponent } from './custom-gender/custom-gender.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { ColorpercentDirective } from '../core/directives/colorpercent.directive';



@NgModule({
  declarations: [CryptocardComponent,CryptosimplecardComponent,ListcryptoComponent,ListformularyComponent,FormularyComponent,CustomGenderComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CurrencyPipe,
    PercentformaterPipe,
    RouterModule,
    DropdownModule,
    FormsModule,
    ColorpercentDirective
  ],
  exports:[CryptocardComponent,CryptosimplecardComponent,ListcryptoComponent,ListformularyComponent,FormularyComponent,CustomGenderComponent]
})
export class SharedModule { }
