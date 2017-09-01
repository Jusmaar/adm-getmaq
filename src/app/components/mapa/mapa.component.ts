import { Component, NgZone, OnInit, ViewChild, ElementRef,Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader,MouseEvent,AgmMarker } from '@agm/core';
import { } from '@types/googlemaps';
import { MapaService } from '../../services/mapa.service';
import { Marcador } from '../../interfaces/marcador.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @Input('datamapa') datamapa:any;
  @Output() pasaBtndireccion = new EventEmitter();

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  infoWindow:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public _ms:MapaService
  ) {
    this._ms.cargarMarcadores();
  }

  ngOnInit() {


    this.zoom = 12;
    this.searchControl = new FormControl();
    console.log(this.searchControl);
    if(this.datamapa){
        this.latitude = parseFloat(this.datamapa.latitud);
        this.longitude = parseFloat(this.datamapa.longitud);
        console.log("en mpaa;",this.datamapa.direccion);
        console.log(this.searchControl.value);
        this.setCurrentPosition(this.latitude,this.longitude);
        this.searchControl.setValue(this.datamapa.direccion);
    }else{
        this.setCurrentPosition();
    }
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.lanzar(place.formatted_address, this.latitude, this.longitude);
        });
      });
    });

  }
 public setCurrentPosition(lat?:number , lng ?:number) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = (lat)?lat:position.coords.latitude;
          this.longitude = (lng)?lng:position.coords.longitude;
          this.zoom = 12;
          var latlng = new google.maps.LatLng( this.latitude,this.longitude);
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'location': latlng },(results,status) =>{
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {
                    this.searchControl.setValue(results[0].formatted_address);
                    console.log(this.searchControl.value );
                    this.lanzar(this.searchControl.value, this.latitude, this.longitude);
                }
              }
          });

        });
      }
    }
public mapClicked($event: MouseEvent) {
  this.latitude = $event.coords.lat,
  this.longitude =$event.coords.lng
  var latlng = new google.maps.LatLng( $event.coords.lat,$event.coords.lng);
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'location': latlng },(results,status) =>{
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
            this.searchControl.setValue(results[0].formatted_address);
            this.lanzar(this.searchControl.value, this.latitude, this.longitude);
        }
      }
   });
  }
markerDragEnd($event){
  var latlng = new google.maps.LatLng( $event.coords.lat,$event.coords.lng);
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'location': latlng },(results,status) =>{
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
            this.searchControl.setValue(results[0].formatted_address);
            this.lanzar(this.searchControl.value, $event.coords.lat, $event.coords.lng);
        }
      }
   });
}

lanzar(dir, lat, lon){
    this.pasaBtndireccion.emit({nameBtndireccion: dir, nameLatitud: lat, nameLongitud: lon});
  }
}
