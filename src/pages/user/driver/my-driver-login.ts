import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Service } from '../../../services/service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { MyClientPage } from '../client/my-client';
import { MenuController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../../../services/alert_types.service';
import { ForgertPasswordPage } from "./forgert-password/forgert-password";
import { RegistrationPage } from './registration/registration';

@IonicPage()
@Component({
  selector: 'page-my-driver-login',
  templateUrl: 'my-driver-login.html',
})

export class MyDriverLoginPage {

  private url_of_Drivers: string = 'https://shabus-mobile-api.herokuapp.com/user/driver/login';
  // private url_of_Drivers: string = 'http://127.0.0.1:4990/user/driver/login';
  private pages: { title: string, page: any }[] = [{ title: "שכחתי סימסה", page: ForgertPasswordPage }, { title: "הרשמה", page: RegistrationPage }];
  private subscription: Subscription;

  constructor(private service: Service,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alert_types_service: Alert_types) {
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true, 'mymenu');
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'mymenu');
  }


  onSignin(form: NgForm) { // when the user click on signin button, this function will activate
    let loading = this.alert_types_service.get_loading_alert();
    loading.present();
    let body = form.value;
    this.service.getlocation().then((resp) => { // in case the GBS feature is active and we can use it
      body['coordination'] = { "latitude": resp.coords.latitude, "longitude": resp.coords.longitude };
      this.subscription = this.service.Send_Data(body, this.url_of_Drivers).subscribe((response: Response) => { //send the serviceenication details to the server
        let json = response.json();
        loading.dismiss();
        if (json['Status'] == 'Accept') {// in case we received from the serve thats the servicenication data is valid(sending the token attached with the response)
          this.service.settoken(json['Token']);
          this.alert_types_service.get_driver_exist_alert(this.service.get_driver_name()).present();
          this.navCtrl.setRoot(MyClientPage);

        } else // in case the detail of the user is not valid 
          this.alert_types_service.get_driver_not_exist_alert().present();


      }, (error) => { //is case we could not connect to the server.  
        loading.dismiss();
        this.alert_types_service.get_failed_to_connect_to_server_alert().present();
      });
    }).catch((error: PositionError) => {  //in case the GBS feature is not active and we can't use it.
      loading.dismiss();
      this.alert_types_service.get_gbs_alert().present();
      return;
    });
  }
  openPage(page) {
    this.navCtrl.push(page);
  }

}
