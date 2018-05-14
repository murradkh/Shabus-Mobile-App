import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

// import firebase from 'firebase';

@Injectable()
export class Authunication {
    private Session: string = null;

    constructor(private http: Http) {

    }
    isAuthinicated() {
        if (this.Session == null)
            return false;
        return true;
    }

    signin(Data: NgForm) {
        // return firebase.auth().signInWithEmailAndPassword(email,password);
            var body = Data.value;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers, withCredentials: true });
            return this.http.post('http://127.0.0.1:4990/users/Driver-login',body,options);
            // return this.http.get('https://www.google.com/');
            
    }
    logout() {
        // localStorage.clear();

        // firebase.auth().signOut();
    }
    // getuser(){
    //     return firebase.auth().currentUser;
    // }
    send(data: string) {
        // const userid=this.getuser().uid;
        //  return this.http.get("https://shapus-ecbb4.firebase.com/"+userid+"/number.json?auth="+token);
        //    let url="https://www.apple.com/itunes/";
        //    return this.http.get('https://staging-shabus.herokuapp.com/');

    }
}