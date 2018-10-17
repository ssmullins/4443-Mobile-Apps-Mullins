import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, 
    public alertCtrl: AlertController) {
  }

  async login(user: User){ 
    try{
    await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    this.navCtrl.setRoot(HomePage);
    //console.log(result);
    }
    catch(e){
      let alert = this.alertCtrl.create({ // Throwing an alert if the User email and Password fails
        title: 'Error in Login',
        message: 'Please check your login credentials' + e ,
        buttons: ['OK']
      });
      alert.present(); 
     // this.navCtrl.push('LoginPage');
      console.error(e);
    }
  }

  register(){ // send the user to the register page
    this.navCtrl.push('RegisterPage');
  }

}
