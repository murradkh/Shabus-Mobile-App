import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../services/service';
import { Alert_types } from '../../../services/alert_types.service'

@IonicPage()
@Component({
  selector: 'page-my-moovit',
  templateUrl: 'my-moovit.html',
})
export class MyMoovitPage {

  private phoneNumber: string = "";
  // private sending_data_subscription: Subscription;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private service: Service,
    private alert_service: Alert_types) {

    this.phoneNumber = this.navParams.get('PhoneNumber');
  }

  // ngOnDestroy() { //when client page will be destroied, it will activate this function
  //   if (this.sending_data_subscription != undefined)
  //     this.sending_data_subscription.unsubscribe();
  // }

  go_back(status: string) {
    if (status == "yes") {
      this.service.Moovit_user_checking(this.phoneNumber); 
    }
     this.navCtrl.pop();
  }


}