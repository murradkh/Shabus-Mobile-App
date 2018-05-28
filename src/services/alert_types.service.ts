import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';


@Injectable()
export class Alert_types {

    constructor(private alert: AlertController,
        private toastctrl: ToastController,
        private loadingctrl: LoadingController) {
    }

    get_shift_is_over_alert(){
        let alert = this.alert.create({
            title: "המשמרת הסתיימה",
            buttons: ['Ok']
          });
          return alert;
    }

    get_gbs_alert() {
        let alert = this.alert.create({
            title: 'שגיאה',
            subTitle: "(GBS).נא לאפשר תכונת המיקום בהגדרות",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_failed_to_connect_to_server_alert() {
        let alert = this.alert.create({
            title: 'שגיאה',
            subTitle: "קרתה שגיאה בהתחברות, נא לפתוח מחדש את האפלקציה ",
            buttons: ['בסדר']
        });

        return alert;
    }
    
    get_no_enternet_connection_alert(){
      let toast =  this.toastctrl.create({
            message: "No enternet connection!",
            position: 'middle'
          });
          return toast;
    }
    get_driver_not_exist_alert() {
        let toast = this.toastctrl.create({
            message: "לא זיהינו אותך, נא לנסות שוב",
            showCloseButton: true,
            closeButtonText: "בסדר",
            position: 'top'
        });
        return toast;
    }

    get_loading_alert() {
        let loading = this.loadingctrl.create({
            content: ' ...בדיקת ניתונים'
        });
        return loading;
    }
    get_new_ride_alert(json){
        const alert = this.alert.create({
            title: ("תודה לך "+json['name']),
            subTitle: "מאחלים לך נסיעה נעימה",
            buttons: ['Ok']
          });
          return alert;
    }
}
