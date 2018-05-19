import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Authunication } from '../../services/service'
import { LoadingController } from 'ionic-angular';
import { MyDriverLoginPage } from '../my-driver-login/my-driver-login'
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../../services/alert_types';

@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html'
})

export class MyClientPage {
  private Num_Of_Passengers: number = 1;
  private Driver_username: string = "";
  private interval: any;
  private URL_of_new_ride: string = "http://127.0.0.1:4990/Users/Passenger/New-Ride";
  private URL_for_sending_the_coordination: string = "http://127.0.0.1:4990/Users/Driver/coordination";
  private subscription: Subscription;

  constructor(public navCtrl: NavController,
    private auth: Authunication,
    private menuCtrl: MenuController,
    private alertTypes: Alert_types) {
  }

  ngOnDestroy() { //when client page will be destroied, it will activate this function
    clearInterval(this.interval);
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ngOnInit() {
    setTimeout(() => {///set timeout for the case if the shift is over
      this.alertTypes.get_shift_is_over_alert().present()
      this.auth.logout();
      this.navCtrl.setRoot(MyDriverLoginPage);
      this.logout();
    }, this.auth.get_Remainng_Time());

    this.interval = setInterval(() => { // here we sending the coordination of the driver to server, every 3 seconds
      let body = {};
      body['Token'] = this.auth.getToken();
      this.auth.getlocation().then((resp) => { // in case we received from the serve thats the authnication data is valid(sending the token attached with the response)
        body['coordination'] = { "latitude": resp.coords.latitude, "longitude": resp.coords.longitude };
        this.auth.Send_Data(body, this.URL_for_sending_the_coordination).subscribe((response: Response) => { //here we sending the coordination of the driver
        }, () => {
          this.alertTypes.get_failed_to_connect_to_server_alert().present();
          this.logout();
        });
      }).catch(() => {  //in case the GBS feature is not active and we can't use it.
        this.alertTypes.get_gbs_alert().present();
        this.logout();
      });
    }, 4000);
    this.Driver_username = this.auth.getUser();
  }

  addClient() {
    if (this.Num_Of_Passengers < 5)
      this.Num_Of_Passengers++;
  }

  logout() {
    clearInterval(this.interval);
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
    this.auth.logout();
    this.menuCtrl.enable(false, 'mymenu');
    this.navCtrl.setRoot(MyDriverLoginPage);
  }

  removeClient() {
    if (this.Num_Of_Passengers > 1)
      this.Num_Of_Passengers--;
  }

  onSubmit(form: NgForm) { //this activating when the user press on button submit, in case there is new passengers ride on the bus.
    let ride = form.value;
    ride['Token'] = this.auth.getToken();
    ride['Num_Of_Passengers'] = this.Num_Of_Passengers
    let loading = this.alertTypes.get_loading_alert();
    loading.present();
    this.subscription = this.auth.Send_Data(ride, this.URL_of_new_ride).subscribe((response: Response) => {
      loading.dismiss();
      let json = response.json();
      if (json['Status'] == 'Accept') { // thats in case the passenger is indeed member in shabus, so he can ride on the bus.
        this.alertTypes.get_new_ride_alert(json).present();
      } else {

        ///////////////////////////////////////////////////now the moovit checking

        // const alert = this.alert.create({
        //   title: '',
        //   subTitle: "מאחלים לך נסיעה נעימה",
        //   buttons: ['Ok']
        // });
        // alert.present();

      }
    }), () => { //thats in case sending coordination to server failed
      loading.dismiss();
      this.alertTypes.get_failed_to_connect_to_server_alert().present();
      this.logout();
    }
  }
}
