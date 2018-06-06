import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { Geolocation } from '@ionic-native/geolocation';
import { Subject } from 'rxjs/Subject';
import { SMS } from '@ionic-native/sms';
import { Alert_types } from './alert_types.service';
// import { MyMoovitPage } from '../pages/user/moovit/my-moovit';
import { Response } from '@angular/http';


@Injectable()
export class Service {
    readonly logOut_Event: Subject<void> = new Subject<void>();
    readonly login_Event: Subject<void> = new Subject<void>();
    private token: string = null;
    private decoded_token: {} = {};
    private url_of_moovit_users: string = "https://shabus-mobile-api.herokuapp.com/user/moovit";
    // private url_of_moovit_users: string = "http://127.0.0.1:4990/user/moovit";
    

    constructor(private http: Http,
        private geolocation: Geolocation,
        private sms: SMS,
        private alertservice: Alert_types) {

        this.token = localStorage.getItem('token');
        this.set_decoded_token();

    }

    settoken(token: string) {
        localStorage.setItem('token', token);
        this.token = token;
        this.set_decoded_token();
        this.login_Event.next();

    }

    set_decoded_token() {
        try {
            this.decoded_token = jwt_decode(this.token);
        } catch (e) {
            this.decoded_token = {}
        }

    }

    getlocation() {
        return this.geolocation.getCurrentPosition();
    }

    get_token() {
        return this.token;
    }



    get_left_time_for_shift_in_milliseconds() { // return the time In Milliseconds
        const date = this.get_token_Expiration_Date();
        const now = new Date();
        let shift = date.valueOf() - now.valueOf();
        return shift;
    }
    convert_to_time_format(time_in_millisceconds){ // return the time in format H:M:S
    let hours = Math.floor(time_in_millisceconds / 3600 / 1000);
    time_in_millisceconds -= (hours * 3600 * 1000);
    let minutes = Math.floor(time_in_millisceconds / 60 / 1000);
    time_in_millisceconds -= (minutes * 60 * 1000);
    let seconds = Math.floor(time_in_millisceconds / 1000);
    return {h:hours, m:minutes, s:seconds};
    }

    get_token_Expiration_Date() { // return the expiration date, which exist in the token. if the token is invalid(or not exist) then returns the current date(so when test the expiration it will give its expired)
        let decoded;
        try {
            decoded = jwt_decode(this.token);
        } catch (e) {
            return new Date();
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        return date;
    }

    is_Authinicated() { //checking the token is valid by expiration date of the token
        if (this.get_left_time_for_shift_in_milliseconds() <= 0)
            return false;
        return true;
    }

    Send_Data(body: {}, URL) { // sending post request to server, with specified url and body
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL, body, options);
    }

    get_driver_name() { // returning the driver name from the decoded token
        return this.decoded_token['name'];
    }

    get_driver_email() { // returning the driver email from the decoded token
        return this.decoded_token['email'];
    }

    clearStorage() {
        localStorage.clear();
        this.token = null;
    }

    send_sms(phone_number, body) {
        return this.sms.send(phone_number, body);
    }

    Moovit_user_checking(phoneNumber) {
        let loading_alert = this.alertservice.get_loading_alert();
        loading_alert.present();
        let body = { "phone_number": phoneNumber, 'Token': this.get_token() };
        this.Send_Data(body, this.url_of_moovit_users).subscribe((response: Response) => {
            let response_json = response.json();
            if (response_json['Status'] == 'Accept') {
                // this.service.send_sms(this.phoneNumber, this.sms_body).then().catch();  
                this.alertservice.get_new_ride_alert({ name: '' }).present();
            } else this.alertservice.get_used_moovit_feature_before_alert().present();

            loading_alert.dismiss();

        }, (error) => {
            this.alertservice.get_failed_to_connect_to_server_alert().present();
            this.logOut_Event.next();
        });
    }

}