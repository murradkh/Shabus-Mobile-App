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
        this.Calculate_left_time_for_shift();
    
    }
    setToken(token: string) {
    
        localStorage.setItem('Token', token);
        this.Token = token;
        this.Calculate_left_time_for_shift();

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
        this.Remaining_time_for_shift = shift;

    }

    get_Token_Expiration_Date() {

        let decoded;
        try {
            decoded = jwt_decode(this.Token);
        }catch (e) {
            return new Date();
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        return date;
    }

    is_Authinicated() {

        let date = this.get_Token_Expiration_Date();
        let now = new Date();
        if ((date.valueOf() - now.valueOf()) <= 0)
            return false;
        return true;

    }


    Send_Data(Data: NgForm,URL) {

        var body = Data.value;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(URL, body, options);

    }
    logout() {

        localStorage.clear();

    }
}