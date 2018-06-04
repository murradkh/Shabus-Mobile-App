import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyClientPage } from './my-client';

@NgModule({
  declarations: [
    MyClientPage,
  ],
  imports: [
    IonicPageModule.forChild(MyClientPage),
  ],
  exports: [
    MyClientPage
  ]
})
export class MyClientPageModule {}
