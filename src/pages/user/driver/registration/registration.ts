import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Alert_types } from '../../../../services/alert_types.service';
import { Service } from '../../../../services/service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { MyClientPage } from '../../client/my-client';

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
  @ViewChild('f') form: NgForm;
  // private Registration_URL: string = "http://127.0.0.1:4990/user/driver/registration";
  private Registration_URL: string = 'https://shabus-mobile-api.herokuapp.com/user/driver/registration';
  private edit_URL: string = "https://shabus-mobile-api.herokuapp.com/user/driver/edit";
  // private edit_URL: string = "http://127.0.0.1:4990/user/driver/edit";
  private URL: string = this.Registration_URL;
  private Img: string = "images/camera.png";
  private editMode: boolean = false;
  private mode:string = 'הרשמה';
  private Http_Subscription: Subscription;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertService: Alert_types,
    private service: Service,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController) {
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
  ionViewDidEnter() {
    let data = this.navParams.data;
    if (data['Name'] != undefined) { // thats mean we are in edit mode
      // console.log(data)
      // console.log(data['Birthday']);
      this.editMode = true;
      this.mode = 'עריכה';
      this.URL = this.edit_URL;
      this.form.setValue({ "Name": data['Name'], "PhoneNumber": data['PhoneNumber'], "Birthday": data['Birthday'], "Password": "", "Email": data['Email'] });
      this.Img = data['Image'];

    }
  }

  OnSubmit(form: NgForm) {

    let loading = this.alertService.get_loading_alert();
    loading.present();
    let body = form.value;
    body['Image'] = this.Img;
    if (this.editMode == true)
      body['Token'] = this.service.get_token();
    this.Http_Subscription = this.service.Send_Data(body, this.URL).subscribe(
      (response: Response) => {
        loading.dismiss();
        body = response.json();
        if (body['Status'] == 'Accept') {
          if(this.editMode == true){
            this.alertService.get_registration_alert("הפרטים עודכנו").present();
            this.service.setImage(this.Img);
            this.service.settoken(body['Token']);
            this.navCtrl.setRoot(MyClientPage);
          }else{
            this.alertService.get_registration_alert("תהליך הרישום עבר בהצחלה, תודה").present();
            this.navCtrl.popToRoot();
          }
        } else {
          this.alertService.get_failed_to_connect_to_server_alert().present();
        };
      }, (error) => {
        loading.dismiss();
        this.alertService.get_failed_to_connect_to_server_alert().present();
      });

  }

  takePicture(sourceImg) {
    this.camera.PictureSourceType.PHOTOLIBRARY;
    const cameraOptions: CameraOptions = {
      quality: 100,
      sourceType: sourceImg,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
      // targetWidth: 800,
      // targetHeight:600
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      alert(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.Img = base64Image;
    }, (err) => {
      console.log(err);
      alert(err);
      this.alertService.get_camera_fail_alert().present();
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'מחק',
          role: 'destructive',
          icon: "trash",
          handler: () => {
            this.Img = 'images/camera.png';
          }
        }, {
          text: 'תפתח מצלמה',
          icon: "camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'בחור תמונה',
          icon: "image",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'בטל',
          icon: "close",
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
