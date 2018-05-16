import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Authunication } from '../../services/service'
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { MyDriverLoginPage } from '../my-driver-login/my-driver-login'
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html'
})

export class MyClientPage {

  private Num_Of_Passengers: number = 1;
  private Driver_username: string = "";
  private interval: any;
  private URL_of_passengers: string = "http://127.0.0.1:4990/Users/Passenger-New-Ride";
  private subscription: Subscription;

  constructor(public navCtrl: NavController,
    private auth: Authunication,
    private Loadingcontrol: LoadingController,
    private alert: AlertController,
    private geolocation: Geolocation) {

  }
  ngOnDestroy() {
    clearInterval(this.interval);
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }
  ngOnInit() {

    setTimeout(() => {///set timeout for the case if the shift is over
      const alert = this.alert.create({
        title: "המשמרת הסתיימה",
        buttons: ['Ok']
      });
      alert.present();
      this.auth.logout()
      this.navCtrl.setRoot(MyDriverLoginPage);
      clearInterval(this.interval);
    }, this.auth.get_Remainng_Time());

    // this.interval = setInterval(() => {
    //   this.geolocation.getCurrentPosition().then((resp) => {

    //     // console.log(resp.coords.latitude);
    //     // console.log(resp.coords.longitude);

    //   }).catch((error) => {
    //     console.log('Error getting location', error)
    //   });
    // }, 4000);

    this.Driver_username = this.auth.getUser();
  }

  addClient() {

    if (this.Num_Of_Passengers < 5)
      this.Num_Of_Passengers++;

  }

  removeClient() {

    if (this.Num_Of_Passengers > 1) 
      this.Num_Of_Passengers--;

  }

  onSubmit(form: NgForm) { //this activing when the user press on button submit

    let ride = form.value;
    ride['Token'] = this.auth.getToken();
    ride['Num_Of_Passengers'] = this.Num_Of_Passengers

    const loading = this.Loadingcontrol.create({
      content: ' ...בדיקת ניתונים',
    });
    loading.present();
    this.subscription = this.auth.Send_Data(ride, this.URL_of_passengers).subscribe((response: Response) => {
     
      loading.dismiss();
      let json_response = response.json();
      console.log(json_response);

    }, (error) => {

      loading.dismiss();
//////////////////////////////////////dont forget to add here

    });
  }
}

// const alert=this.alert.create({
//   title:"הפרטים נקלטו",
// buttons:['Ok']

// });
// alert.present();
// break;
// }

