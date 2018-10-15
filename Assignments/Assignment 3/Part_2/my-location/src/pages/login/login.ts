import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/models';
import {AngularFireAuthModule, AngularFireAuth} from "angularfire2/auth";
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  async login(user: User){ 
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    if(result){
      this.navCtrl.setRoot(HomePage);
    }
    
    //console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }

  register(){ // send the user to the register page
    this.navCtrl.push('RegisterPage');
  }

}
