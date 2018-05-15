import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Authunication } from '../services/service';
import { MyDriverLoginPage } from '../pages/my-driver-login/my-driver-login';//--------//
import { MyClientPage } from '../pages/my-client/my-client';//--------//
import { MyCouponsPage } from '../pages/my-coupons/my-coupons';//--------//
import { MyShekelPerKmPage } from '../pages/my-shekel-per-km/my-shekel-per-km';//--------//


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private pages: Array<{ title: string, component: any }>;
  public isToggled: boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: Authunication, public menuCtrl: MenuController) {
    this.isToggled = false;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pages = [
        { title: 'נוסעים', component: MyClientPage },
        { title: 'קופונים', component: MyCouponsPage },
        { title: 'שקל לק"מ', component: MyShekelPerKmPage }
      ];
    });
  }
  ngOnInit() {

    if (this.auth.is_Authinicated()) {
      this.nav.setRoot(MyClientPage);
      this.menuCtrl.enable(true, 'mymenu');
    } else {
      this.nav.setRoot(MyDriverLoginPage);

    }
  }
  openPage(page) {

    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

  logout() {

    this.menuCtrl.enable(false, 'mymenu');
    this.auth.logout();
    this.nav.setRoot(MyDriverLoginPage);

  }
}
