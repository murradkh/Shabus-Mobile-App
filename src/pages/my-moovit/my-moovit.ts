import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../services/service';
@IonicPage()
@Component({
  selector: 'page-my-moovit',
  templateUrl: 'my-moovit.html',
})
export class MyMoovitPage {

  private phoneNumber: string;
  private sms_body: string = "בקשת הצטרפות לשבוס: \n https://app.shabus.co.il/register/";

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private service: Service) {

    this.phoneNumber = this.navParams.data;

  }

  ionViewDidLoad() {

  }

  goBack(status: string) {
    if (status == "yes") {
      this.service.send_sms(this.phoneNumber, this.sms_body).then().catch();
      this.navCtrl.pop();
    }
  }

}
