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

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: Authunication,
    private menuCtrl: MenuController,
    private network: Network,
    private toastctrl: ToastController) {

    this.platform.ready().then(() => {
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
    this.network.onDisconnect().subscribe(() => { // subscriping to the disconnection event
      toast = this.toastctrl.create({
        message: "No enternet connection!",
        position: 'middle'
      });
      toast.present();
    });
    this.network.onConnect().subscribe(() => { // subscriping to the reconnection event(after i was disconnected)
      toast.dismiss();
    });
    if (this.auth.is_Authinicated()) {  //here we checking if the user have valid token in storage(not expired)
      this.nav.setRoot(MyClientPage);
      this.menuCtrl.enable(true, 'mymenu');
    } else this.nav.setRoot(MyDriverLoginPage);
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
