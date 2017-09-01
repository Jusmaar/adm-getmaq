import { Injectable } from '@angular/core';
import { Marcador } from "../interfaces/marcador.interface";

@Injectable()
export class MapaService {

  marcadores:Marcador[]=[];

  constructor() {

    let nuevoMarcador:Marcador = {
      lat:-12.087210905594343,
      lng:-76.99528008699417,
      draggable:true
    }

    this.marcadores.push(nuevoMarcador);
  }

  insertarMarcador( marcador:Marcador ){
    this.marcadores.push(marcador);
    this.guardarMarcadores();
  }

  guardarMarcadores(){

    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));

  }

  cargarMarcadores(){
    if( localStorage.getItem('marcadores') ){
      this.marcadores = JSON.parse( localStorage.getItem('marcadores') );
    }else{
      this.marcadores = [];
    }

  }
  borrarMarcador(idx:number){
    this.marcadores.splice(idx,1);
    this.guardarMarcadores();
  }

}
