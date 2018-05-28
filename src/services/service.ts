import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { Geolocation } from '@ionic-native/geolocation';
import { Subject } from 'rxjs/Subject';
import { SMS } from '@ionic-native/sms';


@Injectable()
export class Service {
    readonly logOut_Event: Subject<void> = new Subject<void>();
    private Token: string = null;
    private Remaining_time_for_shift: number = 0;

    constructor(private http: Http,
        private geolocation: Geolocation,
        private sms: SMS) {

        this.Token = localStorage.getItem('Token');
        this.Remaining_time_for_shift = this.Calculate_left_time_for_shift();


    }

    setToken(token: string) {
        localStorage.setItem('Token', token);
        this.Token = token;
        this.Remaining_time_for_shift = this.Calculate_left_time_for_shift();
    }

    getlocation() {
        return this.geolocation.getCurrentPosition();
    }

    getToken() {
        return this.Token;
    }

    get_Remainng_Time() { // return the remaining time for the shift
        return this.Remaining_time_for_shift;
    }

    Calculate_left_time_for_shift() { // In Milliseconds
        const date = this.get_Token_Expiration_Date();
        const now = new Date();
        let shift = date.valueOf() - now.valueOf();
        return shift;
    }

    get_Token_Expiration_Date() { // return the expiration date, which exist in the token. if the token is invalid(or not exist) then returns the current date(so when test the expiration it will give its expired)
        let decoded;
        try {
            decoded = jwt_decode(this.Token);
        } catch (e) {
            return new Date();
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        return date;
    }

    is_Authinicated() { //checking the token is valid by expiration date of the token
        if (this.Calculate_left_time_for_shift() <= 0)
            return false;
        return true;
    }

    Send_Data(body: {}, URL) { // sending post request to server, with specified url and body
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL, body, options);
    }

    getUser() { // returning the user email which exists in the token
        let decoded;
        try {
            decoded = jwt_decode(this.Token);
        } catch (e) {
            return "";
        }
        return decoded['user'];
    }

    clearStorage() {
        localStorage.clear();
    }
    send_sms(phone_number, body) {
        return this.sms.send(phone_number, body);
    }
}