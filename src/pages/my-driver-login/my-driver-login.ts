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

  private url_of_Drivers: string = 'http://127.0.0.1:4990/Users/Driver/login';
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
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    this.splash = false;
    setTimeout(() => this.splash = false, 3000);
    this.menuCtrl.enable(false, 'mymenu');
  }

  onSignin(form: NgForm) { // when the user click on signin button, this function will activate
    const loading = this.Loadingcontrol.create({
      content: ' ...מתחבר'
    });
    loading.present();
    let body = form.value;
    this.auth.getlocation().then((resp) => { // in case the GBS feature is active and we can use it
      body['coordination'] = { "latitude": resp.coords.latitude, "longitude": resp.coords.longitude };

      this.subscription = this.auth.Send_Data(body, this.url_of_Drivers).subscribe((response: Response) => { //send the authenication details to the server
        let json = response.json();
        loading.dismiss();
        if (json['Status'] == 'Accept') {// in case we received from the serve thats the authnication data is valid(sending the token attached with the response)
          this.auth.setToken(json['Token']);
          this.navCtrl.setRoot(MyClientPage);
          this.menuCtrl.enable(true, 'mymenu');
          this.auth.get_Token_Expiration_Date();

        } else { // in case the detail of the user is not valid 
          const toast = this.toastctrl.create({
            message: "לא זיהינו אותך, נא לנסות שוב",
            showCloseButton: true,
            closeButtonText: "בסדר",
            position: 'top'
          });
          toast.present();}

      }, (error) => { //is case we could not connect to the server.  
        loading.dismiss();
        const alert = this.alert.create({
          title: 'שגיאה',
          subTitle: "קרתה שגיאה בהתחברות, נא לפתוח מחדש את האפלקציה ",
          buttons: ['בסדר']
        });
        alert.present(); 
      });
      
    }).catch((error) => {  //in case the GBS feature is not active and we can't use it.
      const alert = this.alert.create({
        title: 'שגיאה',
        subTitle: "(GBS).נא לאפשר תכונת המיקום בהגדרות",
        buttons: ['בסדר']
      });
      alert.present();
      loading.dismiss();
      return;
    });

    //   body['coordination'] = this.auth.getlocation();
    //   if (body['coordination'] == undefined){
    //     loading.dismiss();
    //     return;
    // }

  }

}
