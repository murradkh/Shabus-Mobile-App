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
  private subscription_onlogin: Subscription;
  private subscription_OnHttpRequest: Subscription;
  private logout_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/logout";
  // private logout_URL: string = "http://127.0.0.1:4990/user/driver/logout";
  private splash = false;
  private root: any;
  private pages = [];
  private hours: number;
  private minutes: number;
  private seconds: number;

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
    if (this.subscription_OnLogout != undefined)
      this.subscription_OnLogout.unsubscribe();
    if (this.subscription_OnHttpRequest != undefined)
      this.subscription_OnHttpRequest.unsubscribe();
    if (this.subscription_onlogin != undefined)
      this.subscription_onlogin.unsubscribe();
  }

  ngOnInit() {


    // let remainng_time = this.service.get_Remainng_Time() //in millisconds
    // console.log(remainng_time);
    // this.hours = Math.floor(remainng_time / 3600 / 1000);
    // remainng_time -= (this.hours * 3600 * 1000);
    // this.minutes = Math.floor(remainng_time / 60 / 1000);
    // remainng_time -= (this.minutes * 60 * 1000);
    // this.seconds = Math.floor(remainng_time / 1000);
    // console.log(this.hours);
    // console.log(this.minutes);
    // console.log(this.seconds);



    this.pages = [
      { title: 'נוסעים', icon: 'images/passengers_logo.png', page: MyClientPage },
      { title: 'Moovit', icon: 'images/moovit_logo1.png' },
      // { title: 'קופונים', Page: MyCouponsPage, icon: '' },
      // { title: 'שקל לק"מ', Page: MyShekelPerKmPage, icon: '' }
    ];

    this.splash = true;
    setTimeout(() => this.splash = false, 3000); // disable the splash after 3 seconds
    // if (!navigator.onLine) { // checking if we had internet connection when the app opened
    //   this.toast = this.alertservice.get_no_enternet_connection_alert();
    //   this.toast.present();
    // }

    // this.network_subscribion = this.network.onDisconnect().subscribe(() => { // subscriping to the disconnection event
    //   this.toast = this.alertservice.get_no_enternet_connection_alert();
    //   this.toast.present();
    // });

    // this.network_subscribion = this.network.onchange().subscribe((tset) => { // subscriping to the reconnection event(after i was disconnected)
    //   this.toast = this.alertservice.get_no_enternet_connection_alert();
    //   this.toast.present();
    // });

    if (this.service.is_Authinicated()) {  //here we checking if the user have valid token in storage(not expired)
      this.root = MyClientPage;
      this.menuCtrl.enable(true, 'mymenu');
      this.update_time_values();
      this.timer(); //activating the timer
    } else this.root = MyDriverLoginPage;

    this.subscription_OnLogout = this.service.logOut_Event.subscribe(() => this.logout());
    this.subscription_onlogin = this.service.login_Event.subscribe(() => {
      this.update_time_values();
      this.timer()
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
    // this.service.Send_Data({ 'Token': this.service.get_token() }, this.logout_URL).then();    
    this.service.clearStorage();
    this.update_time_values();
  }

  timer() { //this method acts like the time watch  
    if (this.seconds != 0)
      this.seconds--;
    else if (this.minutes != 0) {
      this.minutes--;
      this.seconds = 59;
    } else if (this.hours != 0) {
      this.hours--;
      this.minutes = 59;
    } else return;
    setTimeout(() => this.timer(), 1000);
  }
  update_time_values() {
    let f = this.service.convert_to_time_format(this.service.get_left_time_for_shift_in_milliseconds());
    this.hours = f.h;
    this.minutes = f.m;
    this.seconds = f.s;
  }

}
