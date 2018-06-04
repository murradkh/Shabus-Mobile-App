import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Service } from './service';


@Injectable()
export class Alert_types {

    private success_logo: SafeHtml;
    private error_logo: SafeHtml;
    private Exclamation_logo: SafeHtml;
    private moovit_logo: SafeHtml;
    private like_logo: SafeHtml;

    constructor(private alert: AlertController,
        private toastctrl: ToastController,
        private loadingctrl: LoadingController,
        private sanitizer: DomSanitizer,
        ) {

        this.success_logo = this.sanitizer.bypassSecurityTrustHtml('<img src="images/success.ico" width=60 height=70>');
        this.error_logo = this.sanitizer.bypassSecurityTrustHtml('<img src="images/failed.jpg" width=60 height=70">');
        this.Exclamation_logo = this.sanitizer.bypassSecurityTrustHtml('<img src="images/Exclamation.png" width=60 height=70>');
        this.moovit_logo = this.sanitizer.bypassSecurityTrustHtml('<img src="images/moovit_logo1.png" width=50 height=70>');
        this.like_logo = this.sanitizer.bypassSecurityTrustHtml('<img src="images/like.png" width=80 height=70>');
    }

    get_shift_is_over_alert() {
        let alert = this.alert.create({
            message: <any>this.Exclamation_logo,
            title: "המשמרת הסתיימה",
            buttons: ['Ok']
        });
        return alert;
    }

    get_gbs_alert() {

        let alert = this.alert.create({
            message: <any>this.Exclamation_logo,
            title: "(GBS).נא לאפשר תכונת המיקום בהגדרות",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_failed_to_connect_to_server_alert() {
        let alert = this.alert.create({
            message: <any>this.error_logo,
            title: "קרתה שגיאה בהתחברות, נא לפתוח מחדש את האפלקציה ",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_no_enternet_connection_alert() {
        let toast = this.toastctrl.create({
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
            position: 'top',
            duration: 4000
        });
        return toast;
    }

    get_driver_exist_alert(name) {
        let alert = this.alert.create({
            message: <any>this.success_logo,
            title: "נסיעה בטוחה " + name,
            buttons: ['בסדר']
        });
        return alert;
    }

    get_loading_alert() {
        let loading = this.loadingctrl.create({
            content: ' ...בדיקת ניתונים'
        });
        return loading;
    }

    get_new_ride_alert(json) {
        const alert = this.alert.create({
            message: <any>this.success_logo,
            title: ("תודה לך " + json['name']),
            subTitle: "מאחלים לך נסיעה נעימה",
            buttons: ['Ok']
        });
        return alert;
    }

    get_logout_alert(name) {
        const alert = this.alert.create({
            message: <any>this.like_logo,
            title: ("תודה לך " + name),
            subTitle: "יום טוב",
            buttons: ['Ok']
        });
        return alert;
    }

    get_prompt_alert(service:Service) {
        const alert = this.alert.create({
            title: <any>this.moovit_logo,
            subTitle: 'Moovit משתמש ',
            inputs: [
                {
                    name: 'phone_number',
                    placeholder: 'מספר טלפון',
                    type: "number"
                }
            ],
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'בטל',
                    role: 'cancel'
                },
                {
                    text: 'שלח',
                    handler: (data) => {
                        service.Moovit_user_checking(data.phone_number);
                    }

                }
            ]
        });
        return alert;
    }
    get_used_moovit_feature_before_alert() {
        let alert = this.alert.create({
            message: <any>this.error_logo,
            title: "moovit השתמשת קודם בתכונת",
            subTitle: "נא לרשום בשבוס",
            buttons: ['בסדר']
        });
        return alert;
    }
}
