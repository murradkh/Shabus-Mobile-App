import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class Authunication {

    private Token: string = null;
    private Remaining_time_for_shift: number = 0;

    constructor(private http: Http) {

        this.Token = localStorage.getItem('Token');
        this.Remaining_time_for_shift = this.Calculate_left_time_for_shift();

    }
    setToken(token: string) {

        localStorage.setItem('Token', token);
        this.Token = token;
        this.Remaining_time_for_shift = this.Calculate_left_time_for_shift();

    }
    getToken() {

        return this.Token;

    }
    get_Remainng_Time() {

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


    Send_Data(body: NgForm, URL) { // sending post request to server, with specified url and body


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
    logout() {
        localStorage.clear();
    }
}