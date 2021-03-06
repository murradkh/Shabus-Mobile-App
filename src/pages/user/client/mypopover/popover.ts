import { ViewController, MenuController, Content } from "ionic-angular";
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Service } from "../../../../services/service";

@Component({
  selector: 'popover-page',
  template: ` 
  <ion-list class='item' style="background-image: url('images/background-login.jpg')">
  <ion-item-divider>
  <img height="130" width="130" [src]="PersonalImage">
  <p class='pp'>{{name}}</p>
  </ion-item-divider>
<ion-item>
<ion-row class="row-dots">
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('white')" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('blue')" class="dot-blue" [class.selected]="background == 'blue'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('grey')" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('red')" class="dot-red" [class.selected]="background == 'red'"></button>
        </ion-col>
      </ion-row>
      </ion-item>
      <button ion-item block (click)="Action('settings')" >
      <p item-right class='pp'>הגדרות</p>
      <ion-icon name="settings" item-right small></ion-icon>
      </button> 

      <button ion-item block (click)="Action('logout')" >
      <p item-right class='pp'>&ensp;התנתק</p>
      <ion-icon name='log-out' item-right small></ion-icon>
       </button> 
      
 </ion-list>
  `
})
export class MyPopOver {
  private contentEle: Content;
  private background = "";
  private name: string;
  private colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'blue': {
      'bg': 'rgb(62, 88, 138)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'red': {
      'bg': 'rgb(143, 57, 57)',
      'fg': 'rgb(255, 255, 255)'
    },
  };
  private PersonalImage:string;

  constructor(private viewctrl: ViewController,
    private navParams: NavParams,
    private menuCtrl: MenuController,
    private service:Service) {
  }

  ngOnInit() {
    this.contentEle = this.navParams.data.contentEle;
    this.name = this.navParams.data.name;
    this.PersonalImage = this.service.getImage();
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.setElementStyle('background', this.colors[color].bg);
  }

  Action(action: string) { //this activated when the user pressed one of the options(in our case there is only logout event)
    this.viewctrl.dismiss({ action: action });
  }

}