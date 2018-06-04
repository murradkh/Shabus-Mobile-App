import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Service } from '../services/service';
import { MyDriverLoginPage } from '../pages/user/driver/my-driver-login';//--------//
import { MyClientPage } from '../pages/user/client/my-client';//--------//
import { MyMoovitPage } from '../pages/user/moovit/my-moovit';//--------//
import { MyCouponsPage } from '../pages/my-coupons/my-coupons';//--------//
import { MyShekelPerKmPage } from '../pages/my-shekel-per-km/my-shekel-per-km';//--------//
// import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Alert_types } from '../services/alert_types.service';
import { MyPopOver } from '../pages/user/client/mypopover/popover';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp,
    MyDriverLoginPage,
    MyClientPage,
    MyMoovitPage,
    MyCouponsPage,
    MyShekelPerKmPage,
    MyPopOver
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyDriverLoginPage,
    MyClientPage,
    MyMoovitPage,
    MyCouponsPage,
    MyShekelPerKmPage,
    MyPopOver

  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    Service,
    Alert_types,
    // Network,
    SMS,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
