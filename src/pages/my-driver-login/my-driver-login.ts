import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular'
import { Authunication } from '../../services/service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { MyClientPage } from '../my-client/my-client';
import { MenuController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-my-driver-login',
  templateUrl: 'my-driver-login.html',
})
export class MyDriverLoginPage {
  private url_of_Drivers: string = 'http://127.0.0.1:4990/Users/Driver-login';
  private splash = true;
  private subscription: Subscription;

  constructor(private alert: AlertController,
    private auth: Authunication,
    private navCtrl: NavController,
    private navParams: NavParams,
    private Loadingcontrol: LoadingController,
    private toastctrl: ToastController,
    private menuCtrl: MenuController) {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ionViewDidLoad() {
    this.splash = false;
    setTimeout(() => this.splash = false, 3000);
    this.menuCtrl.enable(false, 'mymenu');
  }

  onSignin(form: NgForm) {

    const loading = this.Loadingcontrol.create({
      content: ' ...מתחבר'
    });
    loading.present();
    this.subscription = this.auth.Send_Data(form.value, this.url_of_Drivers).subscribe((response: Response) => {

      let json = response.json();
      loading.dismiss();

      if (json['Status'] == 'Accept') {

        this.auth.setToken(json['Token']);
        this.navCtrl.setRoot(MyClientPage);
        this.menuCtrl.enable(true, 'mymenu');
        this.auth.get_Token_Expiration_Date();

      } else {

        const toast = this.toastctrl.create({
          message: "לא זיהינו אותך, נא לנסות שוב",
          duration: 3000,
          showCloseButton:true,
          closeButtonText:"בסדר",
          position: 'top'
        });
        toast.present();

      }
    }, (error) => {
      loading.dismiss();
      const alert = this.alert.create({
        title: 'שגיאה',
        subTitle: "קרתה שגיאה בהתחברות, נא לפתוח מחדש את האפלקציה ",
        buttons: ['בסדר']
      });
      alert.present();
    });


  }

}
