import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import { Alert_types } from '../../../../services/alert_types.service';
import { Service } from '../../../../services/service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Camera, CameraOptions} from '@ionic-native/camera';
/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  @ViewChild('input1') Input;
  @ViewChild('password') PasswordInput;
  private Registration_URl:string = "http://127.0.0.1:4990/user/driver/registration";
  private Img:string = "images/camera.png";
  private  CameraOptions:CameraOptions;
    // private Registration_URl: string = 'https://shabus-mobile-api.herokuapp.com/user/driver/registration';
  private Http_Subscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertService:Alert_types,
              private service:Service,
              private camera:Camera) {
  }

  ngOnDestroy() {
   
    if (this.Http_Subscription != undefined)
      this.Http_Subscription.unsubscribe();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.Input.setFocus();
    }, 500);

    this.CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
      // correctOrientation: true,
      // targetWidth: 800,
      // targetHeight:600
    }

    }

  OnSubmit(form:NgForm){

    let loading =this.alertService.get_loading_alert();
    loading.present();
    let body = form.value;
    body['Image'] = this.Img;
    this.Http_Subscription =this.service.Send_Data(body,this.Registration_URl).subscribe(
      (response:Response)=>{
        loading.dismiss();
        body = response.json();
        if(body['Status']=='Accept'){
this.alertService.get_new_user_registered_alert().present();
this.navCtrl.popToRoot();
        }else {
          this.alertService.get_driver_already_exist_alert().present();
        };
      },(error)=>{
        loading.dismiss();
        this.alertService.get_failed_to_connect_to_server_alert().present();
      });
      
  }

  takePicture(){
  this.camera.getPicture(this.CameraOptions).then((imageData) => {
   let base64Image = 'data:image/jpeg;base64,' + imageData;
   this.Img = base64Image;
  }, (err) => {
    console.log(err);
    alert(err);
    this.alertService.get_camera_fail_alert().present();
  });
}
}
