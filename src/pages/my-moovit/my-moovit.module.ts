import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMoovitPage } from './my-moovit';

@NgModule({
  declarations: [
    MyMoovitPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMoovitPage),
  ],
  exports: [
    MyMoovitPage
  ]
})
export class MyMoovitPageModule {}
