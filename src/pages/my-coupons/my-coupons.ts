import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MyCouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-coupons',
  templateUrl: 'my-coupons.html',
})
export class MyCouponsPage {


private  businesses: Array<string>=undefined;
private  chosenBusiness: number=undefined;
private  cardNumber: number=undefined;
private  phoneNumber: string=undefined;

  constructor(public navCtrl: NavController, 
          public navParams: NavParams, 
          private alertCtrl: AlertController) {
          this.businesses = ['business1', 'business2', 'business3', 'business4', 'business5']
          this.chosenBusiness = -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCouponsPage');  
  }


  chooseBusiness(name : string){
    for(var i=0; i<this.businesses.length; i++){
      if(this.businesses[i] === name){
        document.getElementsByClassName(name)[0].setAttribute("style", "border: 4px solid #606060");
        this.chosenBusiness = i;
      }
      else if(this.businesses[i] !== name)
        document.getElementsByClassName(this.businesses[i])[0].setAttribute("style", "border: none");

    }
  }


  rideRegistration(){
    if(this.chosenBusiness === -1){
      let failed = this.alertCtrl.create({
        title: '<font color="red">!שגיאה</font>',
        message: 'אנא בחר עסק מבוקש',
        buttons: [{text: 'סגור'}]
      });
      failed.present();
    }

    else{
      let confirm = this.alertCtrl.create({
        title: 'הרישום בוצע',
        message: this.businesses[this.chosenBusiness] + ' :עסק' + '<p>' + this.cardNumber + ' :מספר כרטיס' 
                  + '<p>' + this.phoneNumber + ' :מספר טלפון',
        buttons: ['אישור']
      });
      confirm.present();
    }
  }







}
