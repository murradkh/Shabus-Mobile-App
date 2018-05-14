import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCouponsPage } from './my-coupons';

@NgModule({
  declarations: [
    MyCouponsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCouponsPage),
  ],
  exports: [
    MyCouponsPage
  ]
})
export class MyCouponsPageModule {}
