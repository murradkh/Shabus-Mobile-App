import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ActionSheetController } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Service } from '../services/service';
import { MyDriverLoginPage } from '../pages/user/driver/my-driver-login';//--------//
import { MyClientPage } from '../pages/user/client/my-client';//--------//
import { MyMoovitPage } from '../pages/user/moovit/my-moovit';//--------//
import { ForgertPasswordPage } from '../pages/user/driver/forgert-password/forgert-password'
import { RegistrationPage } from '../pages/user/driver/registration/registration'
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Alert_types } from '../services/alert_types.service';
import { MyPopOver } from '../pages/user/client/mypopover/popover';
import { Camera } from '@ionic-native/camera';
// import { Network } from '@ionic-native/network';
// import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    MyDriverLoginPage,
    MyClientPage,
    MyMoovitPage,
    MyPopOver,
    ForgertPasswordPage,
    RegistrationPage
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
    MyPopOver,
    ForgertPasswordPage,
    RegistrationPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    Service,
    Alert_types,
    Keyboard,
    Camera,
    // Network,
    // HTTP,
    ActionSheetController,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
