import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Service } from './service';


@Injectable()
export class Alert_types {

    private success_icon: SafeHtml;
    private error_icon: SafeHtml;
    private Exclamation_icon: SafeHtml;
    private moovit_icon: SafeHtml;
    private like_icon: SafeHtml;
    private connection_error_icon: SafeHtml;

    constructor(private alert: AlertController,
        private toastctrl: ToastController,
        private loadingctrl: LoadingController,
        private sanitizer: DomSanitizer,
    ) {

        this.success_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/success.png" width=60 height=70 ></center>');
        this.error_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/unsuccess.png" width=60 height=70"></center>');
        this.Exclamation_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/Exclamation.png" width=60 height=70></center>');
        this.moovit_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/moovit_logo1.png" width=50 height=70></center>');
        this.like_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/like.png" width=80 height=70></center>');
        this.connection_error_icon = this.sanitizer.bypassSecurityTrustHtml('<center><img src="images/connection-error.png" width=80 height=70></center>');


    }

    get_shift_is_over_alert() {
        let alert = this.alert.create({
            message: <any>this.Exclamation_icon,
            title: "<center>המשמרת הסתיימה</center>",
            buttons: ['Ok']
        });
        return alert;
    }

    get_gbs_alert() {

        let alert = this.alert.create({
            message: <any>this.Exclamation_icon,
            title: "<center>.נא לאפשר תכונת המיקום בהגדורת (GBS)</center>",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_failed_to_connect_to_server_alert() {
        let alert = this.alert.create({
            message: <any>this.connection_error_icon,
            title: "<center>קרתה שגיאה בהתחברות</center>",
            subTitle: "<center>נא לבדוק התחברות לאינטרט או לפתוח מחדש את האפלקציה</center> ",
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
            position: 'top',
            duration: 4000,
            cssClass: "toast_class"
        });
        return toast;
    }

    get_driver_already_exist_alert() {
        let alert = this.alert.create({
            message: <any>this.error_icon,
            title: '<center>שגיאה</center>',
            subTitle: "<center>! אתה כבר רשום במערכת </center>",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_new_user_registered_alert() {
        let alert = this.alert.create({
            message: <any>this.success_icon,
            title: "<center>תהליך הרישום עבר בהצחלה, תודה</center>",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_driver_exist_alert(name) {
        let alert = this.alert.create({
            message: <any>this.success_icon,
            title: "<center>נסיעה בטוחה " + name + "</center>",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_loading_alert() {
        let loading = this.loadingctrl.create({
            content: '<right> ...בדיקת ניתונים</right>'
        });
        return loading;
    }

    get_new_ride_alert(json) {
        const alert = this.alert.create({
            message: <any>this.success_icon,
            title: "<center>תודה לך " + json['name'] + "</center>",
            subTitle: "<center>מאחלים לך נסיעה נעימה</center>",
            buttons: ['Ok']
        });
        return alert;
    }

    get_logout_alert(name) {
        const alert = this.alert.create({
            message: <any>this.like_icon,
            title: "<center>תודה לך " + name + "</center>",
            subTitle: "<center>יום טוב</center>",
            buttons: ['Ok']
        });
        return alert;
    }

    get_prompt_alert(service: Service) {
        const alert = this.alert.create({
            title: <any>this.moovit_icon,
            subTitle: '<center>Moovit משתמש</center> ',
            inputs: [
                {
                    name: 'phone_number',
                    placeholder: 'מספר טלפון',
                    type: "number",
                    checked: true
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
            message: <any>this.error_icon,
            title: "<center> השתמשת קודם בתכונת Moovit</center>",
            subTitle: "<center>נא לרשום בשבוס</center>",
            buttons: ['בסדר']
        });
        return alert;
    }
    get_camera_fail_alert() {
        let alert = this.alert.create({
            message: <any>this.error_icon,
            title: "<center>שגיאה</center>",
            subTitle: "<center>קרתה שגיאה בתהליך הצילום, נא לבדוק את הרשאות האפלקצייה לצילום </center>",
            buttons: ['בסדר']
        });
        return alert;
    }

    get_inValid_code_number_toast() {
        const toast = this.toastctrl.create({
            message: "הכנסת מספר תקוף לא תקין, נא לנסות שוב",
            duration: 3500,
            position: "top",
            cssClass: "toast_class"
        });
        return toast;
    }
    get_passwords_not_matching_alert() {
        let alert = this.alert.create({
            title: "<center> הסימאות שהקלדת שונות, נא לנסות שוב </center>",
            buttons: ['בסדר']
        });
        return alert;
    }
    get_password_changed_alert() {
        let alert = this.alert.create({
            title: "<center>שינוי הסיסמה עבר בהצלחה</center>",
            message: <any>this.success_icon,
            buttons: ['בסדר']
        });
        return alert;
    }
}
