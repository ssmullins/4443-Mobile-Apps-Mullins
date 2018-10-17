import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data/data';
import { AngularFireAuth } from "angularfire2/auth";

declare var google;
var  latitude = 0; // Store coordinates and send them in a tuple
var longitude = 0;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {
  
  location = {} as Coordinates; 

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private dataproviter: DataProvider,
    private afAuth: AngularFireAuth, private toast: ToastController) {
  }
  
  ionViewDidLoad(){
    this.afAuth.authState.subscribe(data => { // Display a message with the email of the user in Home Page
      if (data.email && data.uid) {
        this.toast.create({
          message: `Welocome, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
      })
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      latitude = position.coords.latitude; // Storing the coordinates
      longitude = position.coords.longitude;

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
    });

   //  console.log(latitude, longitude);

    let content = "<h4>Information!</h4>";         
    this.addInfoWindow(marker, content);

    // Passing the coordinates so they can be stored in the database
    let x: [number, number];
    x = [latitude, longitude];
    this.dataproviter.Update_coordinates_Time(x);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
}