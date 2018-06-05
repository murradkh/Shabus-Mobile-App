import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgertPasswordPage } from './forgert-password';

@NgModule({
  declarations: [
    ForgertPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgertPasswordPage),
  ],
  exports: [
    ForgertPasswordPage
  ]
})
export class ForgertPasswordPageModule {}
