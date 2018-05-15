import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Authunication } from '../services/service';
import { MyDriverLoginPage } from '../pages/my-driver-login/my-driver-login';//--------//
import { MyClientPage } from '../pages/my-client/my-client';//--------//
import { MyCouponsPage } from '../pages/my-coupons/my-coupons';//--------//
import { MyShekelPerKmPage } from '../pages/my-shekel-per-km/my-shekel-per-km';//--------//
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private pages: Array<{ title: string, component: any }>;
  public isToggled: boolean;

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: Authunication,
    private menuCtrl: MenuController,
    private network: Network,
    private toastctrl: ToastController) {

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
    let toast;
    this.network.onDisconnect().subscribe(() => {
      toast = this.toastctrl.create({
        message: "No enternet connection!",
        position: 'middle'
      });
      toast.present();
    });
    this.network.onConnect().subscribe(() => {
      toast.dismiss();
    });

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
