import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Subscriber } from 'rxjs/Subscriber';
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

async getUser() {
  console.log("Getting user")
  let userCollection = this.firestore.collection<any>('users');
  let users = userCollection.valueChanges().subscribe((users) => console.log(users));
}

}
