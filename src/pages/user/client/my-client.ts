import { Component, ViewChild } from '@angular/core';
import { IonicPage, PopoverController, NavController} from 'ionic-angular';
import { Service } from '../../../services/service'
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../../../services/alert_types.service';
import { MyPopOver } from './mypopover/popover';
import { MyMoovitPage } from '../moovit/my-moovit';
import { RegistrationPage } from '../driver/registration/registration';
@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html'
})

export class MyClientPage {

  @ViewChild('contentEle') contentEle;
  @ViewChild('f') form;
  public Num_Of_Passengers: number = 1;
  public phoneNumber:string="";
  private driver_name: string = "";
  private interval: any;
  private new_ride_URL: string = "https://shabus-mobile-api.herokuapp.com/user/passenger/new-ride";
  private sending_the_coordination_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/coordination";
  // private new_ride_URL: string = "http://127.0.0.1:4990/user/passenger/new-ride";
  // private sending_the_coordination_URL: string = "http://127.0.0.1:4990/user/driver/coordination";
  private subscription_1: Subscription;
  private subscription_2: Subscription;

  constructor(private navCtrl: NavController,
    private service: Service,
    private alert_types_service: Alert_types,
    private popoverctrl: PopoverController) {
  }

  ngOnDestroy() { //when client page will be destroied, it will activate this function

    clearInterval(this.interval);
    if (this.subscription_1 != undefined)
      this.subscription_1.unsubscribe();
    if (this.subscription_2 != undefined)
      this.subscription_2.unsubscribe();
  }

  ngOnInit() {

    setTimeout(() => {///set timeout for the case if the shift is over
      this.alert_types_service.get_shift_is_over_alert().present()
      this.logout();
    }, this.service.get_left_time_for_shift_in_milliseconds());

    this.interval = setInterval(() => { // here we sending the coordination of the driver to server, every 3 seconds

      let body = {};
      body['Token'] = this.service.get_token();
      this.service.getlocation().then((resp) => { // in case we received from the serve thats the authnication data is valid(sending the token attached with the response)
        body['Coordination'] = { "lat": resp.coords.latitude, "lng": resp.coords.longitude };
        this.subscription_2 = this.service.Send_Data(body, this.sending_the_coordination_URL).subscribe((response: Response) => { //here we sending the coordination of the driver
        }, () => {
          this.alert_types_service.get_failed_to_connect_to_server_alert().present();
          this.logout();
        });
      }).catch(() => {  //in case the GBS feature is not active and we can't use it.
        this.alert_types_service.get_gbs_alert().present();
        this.logout();
      });
    }, 5000);
    this.driver_name = this.service.get_driver_keyValue("Name");
  }

  addClient() {

    if (this.Num_Of_Passengers < 5)
      this.Num_Of_Passengers++;
  }

  logout() {

    this.ngOnDestroy();
    this.service.logOut_Event.next();

  }

  removeClient() {

    if (this.Num_Of_Passengers > 1)
      this.Num_Of_Passengers--;
  }

  onSubmit(form: NgForm) { //this activating when the user press on button submit, in case there is new passengers ride on the bus.

    let ride = form.value;
    ride['Token'] = this.service.get_token();
    ride['Num of passengers'] = this.Num_Of_Passengers
    let loading = this.alert_types_service.get_loading_alert();
    loading.present();
    this.subscription_1 = this.service.Send_Data(ride, this.new_ride_URL).subscribe((response: Response) => {
      loading.dismiss();
      let json = response.json();
      if (json['Status'] == 'Accept')  // thats in case the passenger is indeed member in shabus, so he can ride on the bus.
        this.alert_types_service.get_new_ride_alert(json).present();
      else if (json['message'] == 'token is not valid!') {
        this.alert_types_service.get_failed_to_connect_to_server_alert().present();
        this.logout();
      }
      else this.navCtrl.push(MyMoovitPage, { PhoneNumber: ride['PhoneNumber'] });

      this.form.reset();

    }), (error) => {
      loading.dismiss();
      this.alert_types_service.get_failed_to_connect_to_server_alert().present();
      this.logout();
    }
  }

  openpopover(event: any) {

    let popover = this.popoverctrl.create(MyPopOver, { 'contentEle': this.contentEle, "name": this.driver_name });
    popover.present({ ev: event });
    popover.onDidDismiss((response) => {
      if (response != null) {
        if (response.action == 'logout') {
          this.alert_types_service.get_logout_alert(this.driver_name).present();
          this.logout();
        } else if (response.action == 'settings') {
          // this.navCtrl.push(RegistrationPage,{"edit":true});
          this.navCtrl.push(RegistrationPage, { "Name": this.service.get_driver_keyValue("Name"), "Email": this.service.get_driver_keyValue("Email"), "BirthDate": this.service.get_driver_keyValue("BirthDate"), "PhoneNumber": this.service.get_driver_keyValue("PhoneNumber"), "Image": this.service.getImage() });

        }
      }
    });

  }


}
