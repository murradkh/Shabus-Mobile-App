import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the MyShekelPerKmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-shekel-per-km',
  templateUrl: 'my-shekel-per-km.html',
})
export class MyShekelPerKmPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuctrl:MenuController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyShekelPerKmPage');
  }
  
}
