import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Service } from '../services/service';
import { MyDriverLoginPage } from '../pages/user/driver/my-driver-login';//--------//
import { MyClientPage } from '../pages/user/client/my-client';//--------//
// import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular'
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../services/alert_types.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  private subscription_OnLogout: Subscription;
  private subscription_OnHttpRequest: Subscription;
  // private network_subscribion: Subscription;
  // private logout_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/logout";
  private logout_URL: string = "http://127.0.0.1:4990/user/driver/logout";
  private splash = false;
  private root: any;
  private pages = [];

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private service: Service,
    private menuCtrl: MenuController,
    // private network: Network,
    private alertservice: Alert_types,
    private toastctrl: ToastController) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  ngOnDestroy() {
    // if (this.subscription_OnLogout != undefined)
    //   this.subscription_OnLogout.unsubscribe();
    // if (this.subscription_OnHttpRequest != undefined)
    //   this.subscription_OnHttpRequest.unsubscribe();
    // if (this.network_subscribion != undefined)
    //   this.network_subscribion.unsubscribe();
    // if (this.subscription_OnMoovitChecking != undefined)
    //   this.subscription_OnMoovitChecking.unsubscribe();
  }

  ngOnInit() {

    this.pages = [
      { title: 'נוסעים', icon: 'images/passengers_logo.png', page: MyClientPage },
      { title: 'Moovit', icon: 'images/moovit_logo1.png' },
      // { title: 'קופונים', Page: MyCouponsPage, icon: '' },
      // { title: 'שקל לק"מ', Page: MyShekelPerKmPage, icon: '' }
    ];

    this.splash = true;
    setTimeout(() => this.splash = false, 3000); // disable the splash after 3 seconds
    // let toast;
//     console.log(navigator.onLine);
// console.log(this.network.type);
//     if (!navigator.onLine) { // checking if we had internet connection when the app opened
//       toast = this.alertservice.get_no_enternet_connection_alert();
//       toast.present();
//     }

//     this.network_subscribion = this.network.onDisconnect().subscribe(() => { // subscriping to the disconnection event
//      console.log("afs");
//       toast = this.alertservice.get_no_enternet_connection_alert();
//       toast.present();
//     });

//     this.network_subscribion = this.network.onConnect().subscribe(() => { // subscriping to the reconnection event(after i was disconnected)
//       console.log("sadasd");

//       if (toast != undefined)
//         toast.dismiss();
//     });

    if (this.service.is_Authinicated()) {  //here we checking if the user have valid token in storage(not expired)
      this.root = MyClientPage;
      this.menuCtrl.enable(true, 'mymenu');
    } else this.root = MyDriverLoginPage;

    this.subscription_OnLogout = this.service.logOut_Event.subscribe(() => {
      this.logout();
    });

  }

  openPage(page) {
    let alert: Alert;
    if (page.title == "Moovit") {
      alert = this.alertservice.get_prompt_alert(this.service);      
      alert.present();
    } else if (page.title == 'נוסעים')
      this.nav.popToRoot();
    else this.nav.push(page.page);
  }

  logout() {
    this.menuCtrl.enable(false, 'mymenu');
    this.nav.setRoot(MyDriverLoginPage);
    this.subscription_OnHttpRequest = this.service.Send_Data({ 'Token': this.service.get_token() }, this.logout_URL).subscribe();
    this.service.clearStorage();
  }
}
