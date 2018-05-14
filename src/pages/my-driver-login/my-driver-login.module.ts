import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDriverLoginPage } from './my-driver-login';

@NgModule({
  declarations: [
    MyDriverLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDriverLoginPage),
  ],
  exports: [
    MyDriverLoginPage
  ]
})
export class MyDriverLoginPageModule {}
