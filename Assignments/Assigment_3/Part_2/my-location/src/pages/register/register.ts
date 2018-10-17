import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { User } from '../../models/models';
import {AngularFireAuthModule, AngularFireAuth} from "angularfire2/auth";
import { DataProvider } from '../../providers/data/data';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams,private dataproviter: DataProvider,
     private afAuth: AngularFireAuth,  public alertCtrl: AlertController, private toast: ToastController) {
  }

  async register(user: User) { // adds the user to the firebase
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password) 
    this.dataproviter.Uploading_Registration_Data(user.first_name, user.last_name, user.email); // uploading to the database collection
    
    // Before Displaying the Login Page Output a Pop out Message that let's the user know they where able to register
    this.toast.create({
      message: `Registration Succesful`,
      duration: 2000
    }).present(); 

    this.navCtrl.push(LoginPage);
    console.log(result);
    }
    catch(e){
      console.error(e);

//    Change to where it checks if each field has something on it 
//  
//
      let alert = this.alertCtrl.create({ // Throwing an alert if the Registration field has an error
        title: 'Error in Registrating',
        message: 'Please check your login credentials' + e ,
        buttons: ['OK']
      });
      alert.present(); 
    }
  }

}
