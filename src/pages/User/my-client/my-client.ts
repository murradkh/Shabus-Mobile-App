import { Component, ViewChild } from '@angular/core';
import { IonicPage, PopoverController, NavController, MenuController, ViewController, ModalController } from 'ionic-angular';
import { Service } from '../../../services/service'
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Alert_types } from '../../../services/alert_types.service';
import { MyPopOver } from './mypopover/popover';
import { MyMoovitPage } from '../../my-moovit/my-moovit';
@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html'
})

export class MyClientPage {
  @ViewChild('contentEle') contentEle;
  @ViewChild('f') form;
  private Num_Of_Passengers: number = 1;
  private Driver_username: string = "";
  private interval: any;
  private new_ride_URL: string = "http://127.0.0.1:4990/User/Passenger/New-Ride";
  private sending_the_coordination_URL: string = "http://127.0.0.1:4990/User/Driver/coordination";
  private subscription: Subscription;

  constructor(private navCtrl: NavController,
    private service: Service,
    private menuCtrl: MenuController,
    private alert_types_service: Alert_types,
    private popoverctrl: PopoverController,
    private viewctrl: ViewController,
    private modalCtrl: ModalController) {
  }

  ngOnDestroy() { //when client page will be destroied, it will activate this function
    clearInterval(this.interval);
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ngOnInit() {
    setTimeout(() => {///set timeout for the case if the shift is over
      this.alert_types_service.get_shift_is_over_alert().present()
      this.logout();
    }, this.service.get_Remainng_Time());

    this.interval = setInterval(() => { // here we sending the coordination of the driver to server, every 3 seconds
      let body = {};
      body['Token'] = this.service.getToken();
      this.service.getlocation().then((resp) => { // in case we received from the serve thats the authnication data is valid(sending the token attached with the response)
        body['coordination'] = { "latitude": resp.coords.latitude, "longitude": resp.coords.longitude };
        this.service.Send_Data(body, this.sending_the_coordination_URL).subscribe((response: Response) => { //here we sending the coordination of the driver
        }, () => {
          this.alert_types_service.get_failed_to_connect_to_server_alert().present();
          this.logout();
        });
      }).catch(() => {  //in case the GBS feature is not active and we can't use it.
        this.alert_types_service.get_gbs_alert().present();
        this.logout();
      });
    }, 5000);
    this.Driver_username = this.service.getUser();
  }

  addClient() {
    if (this.Num_Of_Passengers < 5)
      this.Num_Of_Passengers++;
  }

  logout() {
    clearInterval(this.interval);
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
    this.service.logOut_Event.next();

  }

  removeClient() {
    if (this.Num_Of_Passengers > 1)
      this.Num_Of_Passengers--;
  }

  onSubmit(form: NgForm) { //this activating when the user press on button submit, in case there is new passengers ride on the bus.
    
    let ride = form.value;
    ride['Token'] = this.service.getToken();
    ride['Num_Of_Passengers'] = this.Num_Of_Passengers
    let loading = this.alert_types_service.get_loading_alert();
    loading.present();

    this.subscription = this.service.Send_Data(ride, this.new_ride_URL).subscribe((response: Response) => {
        loading.dismiss();
        let json = response.json();
        if (json['Status'] == 'Accept') { // thats in case the passenger is indeed member in shabus, so he can ride on the bus.
          this.alert_types_service.get_new_ride_alert(json).present();
          this.form.reset();
        } else this.modalCtrl.create(MyMoovitPage);

    }), () => { //thats in case sending coordination to server failed
      loading.dismiss();
      this.alert_types_service.get_failed_to_connect_to_server_alert().present();
      this.logout();

    }
  }
  openpopover(event: any) {

    let popover = this.popoverctrl.create(MyPopOver, { 'contentEle': this.contentEle, "name": this.Driver_username });
    popover.present({ ev: event });
    popover.onDidDismiss((response) => {
      if (response.action == 'logout') {
        this.logout();
      }
    });
  }
}
