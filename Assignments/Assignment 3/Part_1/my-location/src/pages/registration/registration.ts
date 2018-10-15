import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/models';
import {AngularFireAuthModule, AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  user = {} as User;
  First_Name;
  Last_Name;
  Email;
  Password;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private dataproviter: DataProvider, private aFuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }


  UploadtoDatabase(){ // Use for testing purpose
    //console.log(this.Username, this.Password)
    this.dataproviter.Uploading_Registration_Data(this.First_Name, this.Last_Name, this.Email, this.Password);
  }
  
}
