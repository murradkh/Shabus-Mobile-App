import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyShekelPerKmPage } from './my-shekel-per-km';

@NgModule({
  declarations: [
    MyShekelPerKmPage,
  ],
  imports: [
    IonicPageModule.forChild(MyShekelPerKmPage),
  ],
  exports: [
    MyShekelPerKmPage
  ]
})
export class MyShekelPerKmPageModule {}
