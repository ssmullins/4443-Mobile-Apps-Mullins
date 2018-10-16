import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/models';
import {AngularFireAuthModule, AngularFireAuth} from "angularfire2/auth";
import { DataProvider } from '../../providers/data/data';

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
     private afAuth: AngularFireAuth) {
  }

  async register(user: User) { // adds the user to the firebase
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    this.dataproviter.Uploading_Registration_Data(user.first_name, user.last_name, user.email); // uploading to the database
    console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }

}
