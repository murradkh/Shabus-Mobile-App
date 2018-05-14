import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

@IonicPage()
@Component({
  selector: 'page-my-moovit',
  templateUrl: 'my-moovit.html',
})
export class MyMoovitPage {

private phoneNumber:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sms:SMS) {
    this.phoneNumber = this.navParams.data;

  }

  ionViewDidLoad() {

  }

  goBack(status:string){
//     if(status=="yes"){
// this.sms.send(this.phoneNumber,"בקשת הצטרפות לשבוס: \n https://app.shabus.co.il/register/").then().catch();
//     }
    this.navCtrl.pop();
  }

}
