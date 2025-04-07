import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ButtonModule,
    TableModule,
    ImageModule,
    SharedModule
],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
