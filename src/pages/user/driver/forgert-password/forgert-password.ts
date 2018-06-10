import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
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
  @ViewChild('input1') input1;
  @ViewChild('input2') input2;
  @ViewChild('input3') input3;

  private phone_number: string = "05";
  private http_subscription: Subscription;
  // private ForgetPassword_URL: string = "http://127.0.0.1:4990/user/driver/forget-password";
  private ForgetPassword_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/forget-password";  
  private CheckCodeNumber_URL: string= "https://shabus-mobile-api.herokuapp.com/user/driver/check-code-number";
  // private CheckCodeNumber_URL: string = "http://127.0.0.1:4990/user/driver/check-code-number";
  // private CheckPassword_URL: string = 'http://127.0.0.1:4990/user/driver/change-password';
  private CheckPassword_URL: string = 'https://shabus-mobile-api.herokuapp.com/user/driver/change-password';
  

  private phoneNumberValid: boolean = false;
  private CodeNumberValid: boolean = false;
  private Duration: number;
  private CodeLength: string;
  private Code: string;
  private image: string;
  private Seconds: number;
  private Minutes: number;
  private timeout: any;
  private pattern: string;
  private NewPassword1: number;
  private NewPassword2: number;
  private PasswordMinLength: number;
  private loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertService: Alert_types,
    private service: Service) {
  }

  ionViewWillLoad() {

    setTimeout(() => {
      this.input1.setFocus();
    }, 500);
  }

  ngOnDestroy() {
    if (this.timeout != undefined)
      clearTimeout(this.timeout);
    if (this.http_subscription != undefined)
      this.http_subscription.unsubscribe();
  }

  Check() {
    this.loading = this.alertService.get_loading_alert();
    this.loading.present();
    if (!this.phoneNumberValid)
      this.CheckPhoneNumber();
    else if (!this.CodeNumberValid)
      this.CheckCodeNumber();
    else this.CheckPassword();

  }

  CheckPhoneNumber() {

    this.http_subscription = this.service.Send_Data({ "PhoneNumber": this.phone_number }, this.ForgetPassword_URL).subscribe((response: Response) => {
      let body = response.json();
      if (body['Status'] == "Reject")
        this.alertService.get_driver_not_exist_alert().present();
      else {
        this.phoneNumberValid = true;
        this.Duration = body.Duration;
        this.CodeLength = body.CodeLength;
        this.pattern = "^[0-9]{" + this.CodeLength + "}$";
        this.image = body.Image;
        localStorage.setItem('temprorey_token', body['Token']);
        setTimeout(() => {
          this.input2.setFocus();
        }, 500);
        this.update_time_values();
        setTimeout(() => {
          this.timer();
        }, 1000);
      }
      this.loading.dismiss();
    }, (error) => {
      this.loading.dismiss();
      this.alertService.get_failed_to_connect_to_server_alert().present();
    });
  }

  CheckCodeNumber() {// if the user entered his phone number and the validation code

    let token = localStorage.getItem('temprorey_token');
    this.http_subscription = this.service.Send_Data({ 'Token': token, "Restoration code": this.Code }, this.CheckCodeNumber_URL).subscribe(
      (response: Response) => {
        let body = response.json();
        if (body['Status'] == 'Accept') {
          localStorage.setItem('temprorey_token', body['Token']);
          this.PasswordMinLength = body['PasswordMinLength'];
          clearTimeout(this.timeout);
          this.CodeNumberValid = true;
          setTimeout(() => {
            this.input3.setFocus();
          }, 500);
        } else this.alertService.get_inValid_code_number_toast().present();
        this.loading.dismiss();
      }, (error) => {
        this.loading.dismiss();
        this.alertService.get_failed_to_connect_to_server_alert().present();
      });
  }

  CheckPassword() {
    if (this.NewPassword1 != this.NewPassword2) {
      this.loading.dismiss();
      this.alertService.get_passwords_not_matching_alert().present();
      return;
    }
    let token = localStorage.getItem('temprorey_token');
    this.http_subscription = this.service.Send_Data({ 'Token': token,"NewPassword":this.NewPassword1 }, this.CheckPassword_URL).subscribe((response: Response) => {
      let body = response.json();
      if (body['Status'] == 'Accept') {
        this.loading.dismiss();
        this.alertService.get_password_changed_alert().present();
        this.navCtrl.popToRoot();
      } else this.alertService.get_failed_to_connect_to_server_alert().present();

    }, (error) => {
      this.loading.dismiss();
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
    this.timeout = setTimeout(() => this.timer(), 1000);
  }
  update_time_values() {
    let f = this.service.convert_to_time_format(this.Duration * 60 * 1000);
    this.Minutes = f.m;
    this.Seconds = f.s;
  }
}

