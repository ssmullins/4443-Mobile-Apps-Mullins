import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {  map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { User } from '../../models/models';

@Injectable()
export class DataProvider {

  constructor(private firestore: AngularFirestore) {
  
}

id = this.firestore.createId(); // Creating the Id for the user

/*#############################################################################################

 Registration Function:
  Will ask the user to input their: Name, Last Name, Password, and email
  Upload the new user in the "Users" collection


###############################################################################################*/

Uploading_Registration_Data(First_Name, Last_Name, Email){
  //console.log(First_Name, Last_Name, Email, Password);
  this.firestore.collection('Users').add({
    ID: this.id, // Must change the ID Based on who is using the app, Get their "ID" 
    First: First_Name,    // Could get the device unique id
    Last: Last_Name,
    Email: Email,
   // Password: Password  
  })

  //
}


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
      ID: this.id, // Must change the ID Based on who is using the app, Get their "ID"
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
