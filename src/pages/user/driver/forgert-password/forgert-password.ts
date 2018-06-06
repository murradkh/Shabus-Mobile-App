import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert_types } from '../../../../services/alert_types.service';
import { Service } from '../../../../services/service';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

/**
 * Generated class for the ForgertPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgert-password',
  templateUrl: 'forgert-password.html',
})
export class ForgertPasswordPage {
  private phone_number: string = "05";
  private http_subscription: Subscription;
  private ForgetPassword_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/forget-password";
  private Valid: boolean = false;
  private Duration:number;
  private Length:string;
  private Code:number;
  private Name:string;
  private Seconds:number;
  private Minutes:number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertService: Alert_types,
    private service: Service) {
  }

  ngOnDestroy() {

    if (this.http_subscription != undefined)
      this.http_subscription.unsubscribe();
  }
  checkPhoneNumber() {

    let loading = this.alertService.get_loading_alert();
    loading.present();
    this.http_subscription = this.service.Send_Data({ "phone_number": this.phone_number }, this.ForgetPassword_URL).subscribe((response: Response) => {
      let body = response.json();
      if (body['Status'] == "Reject")
        this.alertService.get_driver_not_exist_alert().present();
      else {
      this.Valid = true;
      this.Duration = body.Duration;
      this.Length = body.Length;
      this.Name = body.Name;
      console.log(body);
      this.update_time_values();
      setTimeout(() => {
        this.timer();
      }, 1000);
      }
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
      this.alertService.get_failed_to_connect_to_server_alert().present();
    });

  }
  timer() { //this method acts like the time watch  
    if (this.Seconds != 0)
      this.Seconds--;
    else if (this.Minutes != 0) {
      this.Minutes--;
      this.Seconds = 59;
    } else return;
    setTimeout(() => this.timer(), 1000);
  }
  update_time_values() {
    let f = this.service.convert_to_time_format(this.Duration*60*1000);
    this.Minutes = f.m;
    this.Seconds = f.s;
  }

}
