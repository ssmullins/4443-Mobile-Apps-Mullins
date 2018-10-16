import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {  map } from 'rxjs/operators';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(private firestore: AngularFirestore) {
    console.log('Hello DataProvider Provider');

}

/*

 Registration Function:
  Will ask the user to input their: Name, Last Name, Password, and email
  Upload the new user in the "Users" collection


*/
Uploading_Registration_Data(First_Name, Last_Name, Email, Password){
  //console.log(First_Name, Last_Name, Email, Password);
  this.firestore.collection('Users').add({
    ID: 101, // Must change the ID Based on who is using the app, Get their "ID" 
    First: First_Name,    // Could get the device unique id
    Last: Last_Name,
    Email: Email,
    Password: Password
  })

  //
}


/*

 Login Function:
 Authenthicate if the user is in the "Users" collection

*/


/*#############################################################################################
 Every time the user wants it's location create a new document in the "location" collection
 with the ID of that user.

 --> Create Function that uploads the new locatin, Time, and ID by creating a new document
        -Must have the Users ID
            - figure out how to associate the ID with the users
###############################################################################################*/
  Update_coordinates_Time(cor) {
    var Time = ~~(Date.now() / 1000) // Gives me the Unix time 
    this.firestore.collection('Locations').add({
      ID: 100, // Must change the ID Based on who is using the app, Get their "ID"
      Point: cor,
      Time: Time
    })
      .then(function (docRef) {  // 
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }


}
