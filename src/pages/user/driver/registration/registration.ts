import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  NgForm } from '@angular/forms';
import { Alert_types } from '../../../../services/alert_types.service';
import { Service } from '../../../../services/service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
// import { Camera, CameraOptions} from '@ionic-native/camera';
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
    // private Registration_URl: string = 'https://shabus-mobile-api.herokuapp.com/user/driver/registration';
  private Http_Subscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertService:Alert_types,
              private service:Service,
              // private camera:Camera
            ) {
  }

  ngOnDestroy() {
   
    if (this.Http_Subscription != undefined)
      this.Http_Subscription.unsubscribe();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.Input.setFocus();
    }, 500);


    }
  OnSubmit(form:NgForm){

    let loading =this.alertService.get_loading_alert();
    loading.present();
    this.Http_Subscription =this.service.Send_Data(form.value,this.Registration_URl).subscribe(
      (response:Response)=>{
        loading.dismiss();
        let body = response.json();
        console.log(body)
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

//   takePicture(){
//     const options: CameraOptions = {
//       quality: 100,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true

//     }

//   this.camera.getPicture(options).then((imageData) => {
//     console.log(imageData);
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64:
//    let base64Image = 'data:image/jpeg;base64,' + imageData;
//   }, (err) => {
//    // Handle error
//   });
// }
}
