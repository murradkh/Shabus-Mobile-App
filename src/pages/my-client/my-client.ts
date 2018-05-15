import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Authunication } from '../../services/service'
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { MyDriverLoginPage } from '../my-driver-login/my-driver-login'
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html'
})
export class MyClientPage {

  private clientCounter: number = 1;
  // private Driver_username:string =  ;
  private interval: any;
  private URL_of_passengers:string = "http://127.0.0.1:4990/Users/Passenger-New-Ride";

  constructor(public navCtrl: NavController,
    private auth: Authunication,
    private Loadingcontrol: LoadingController,
    private alert: AlertController,
    private geolocation: Geolocation) {

  }
  ngOnDestroy() {
    clearInterval(this.interval);
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
    

    this.interval = setInterval(() => {
      this.geolocation.getCurrentPosition().then((resp) => {

        // console.log(resp.coords.latitude);
        // console.log(resp.coords.longitude);
        
      }).catch((error) => {
        console.log('Error getting location', error)
      });
    }, 4000);
  }

  addClient() {
    if (this.clientCounter < 5)
      this.clientCounter++;

  }

  removeClient() {
    if (this.clientCounter > 1) {
      this.clientCounter--;
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value())
         const loading=this.Loadingcontrol.create({
    content:' ...בדיקת ניתונים',
        });
         loading.present();
         this.auth.Send_Data(form, this.URL_of_passengers).subscribe((response:Response)=>{
          let json_response = response.json();
          console.log(json_response);

         },(error)=>{

         });
  
  }
}
//       let data={};
//       for (let prop in x) {
//       data=x[prop]
//     }
//     let check=false;
//       for (let prop in data) {
// if(data[prop]==this.phoneNumber ){
//   check=true;
// const alert=this.alert.create({
//   title:"הפרטים נקלטו",
// buttons:['Ok']

// });
// alert.present();
// break;
// }


//       }
//       if(check==false){
// }



//    },
//    error => {
//      loading.dismiss();
//      console.log(error);
  //  }
  //  );


  //  });



