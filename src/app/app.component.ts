import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Service } from '../services/service';
import { MyDriverLoginPage } from '../pages/User/my-driver-login/my-driver-login';//--------//
import { MyClientPage } from '../pages/User/my-client/my-client';//--------//
import { MyCouponsPage } from '../pages/my-coupons/my-coupons';//--------//
import { MyShekelPerKmPage } from '../pages/my-shekel-per-km/my-shekel-per-km';//--------//
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular'
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../services/alert_types.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private pages: Array<{ title: string, component: any }>;
  private subscription_OnLogout: Subscription;
  private subscription_OnHttpRequest: Subscription;
  private logout_URL: string = "http://127.0.0.1:4990/User/Driver/logout";

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private service: Service,
    private menuCtrl: MenuController,
    private network: Network,
    private alertservice: Alert_types,
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

  ngOnDestroy() {
    this.subscription_OnLogout.unsubscribe();
    this.subscription_OnHttpRequest.unsubscribe();
  }

  ngOnInit() {
    let toast;
    if(!navigator.onLine){
      toast = this.alertservice.get_no_enternet_connection_alert();
      toast.present();
    }
    
    this.network.onDisconnect().subscribe(() => { // subscriping to the disconnection event
      toast = this.alertservice.get_no_enternet_connection_alert();
      toast.present();
    });

    this.network.onConnect().subscribe(() => { // subscriping to the reconnection event(after i was disconnected)
      if (toast != undefined)
        toast.dismiss();
    });

    if (this.service.is_Authinicated()) {  //here we checking if the user have valid token in storage(not expired)
      this.nav.setRoot(MyClientPage);
      this.menuCtrl.enable(true, 'mymenu');
    } else this.nav.setRoot(MyDriverLoginPage);

    this.subscription_OnLogout = this.service.logOut_Event.subscribe(() => {
      this.logout();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.menuCtrl.enable(false, 'mymenu');
    this.nav.setRoot(MyDriverLoginPage);
    this.subscription_OnHttpRequest = this.service.Send_Data({ 'Token': this.service.getToken() }, this.logout_URL).subscribe();
    this.service.clearStorage();
  }

}
