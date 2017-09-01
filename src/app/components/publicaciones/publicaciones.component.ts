import { Component, OnInit } from '@angular/core';
import { PublicarService } from '../../services/publicar.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {

  /* fechas:string[]=['Ultimos 30 dias','Esta semana','Hoy']; */
  /* categorias:string[]=['Autohormiguera','Camion grua','Cargador Frontal','Excavadoras','Dumper'];
  marcas:string[]=['Samsung','Caterpillar'];
  tipos:string[]=['alquiler','venta']; */

  categoryId: any;
  brandId: any;
  type: any;
  link: string = 'hola'

  // Oncheck = true;
  listaPublicaciones: any[] = [];
  listaMarcas: any[] = [];
  listaCategorias: any[] = [];
  listaTipos: any[] = [];
  iduser: any;

   p: number = 1;
  constructor(private _pS: PublicarService) {

  }

  ngOnInit() {
    /* console.log(this.fechas); */
    console.log(screen.width);
    if (screen.width < 630) {
      var tabla = document.getElementById("tabla");
      tabla.classList.add("table-responsive")
    }
    this.iduser = JSON.parse(localStorage.getItem('client')).id;
    this.getListaPublicaciones();
    this.getCaterogia();
    this.getMarcas();
    this.getTipos();
  }

  getListaPublicaciones() {
    let publicaciones = this._pS.getPublicaciones(this.iduser)
      .subscribe(res => {
        console.log(res);
        this.listaPublicaciones = res;
        console.log(this.listaPublicaciones);
        publicaciones.unsubscribe();
      });

  }

  getMarcas() {
    let mar = this._pS.getMarcas()
      .subscribe(res => {
        this.listaMarcas = res;
        console.log(this.listaMarcas);
        mar.unsubscribe;
      });
  }

  getCaterogia() {
    let cat = this._pS.getCatergorias()
      .subscribe(res => {
        // console.log(res)
        this.listaCategorias = res;
        // console.log(this.listaCategorias);
        cat.unsubscribe();
      });
  }

  buscar(): void {
    let query: string = `usuarioId=${this.iduser}`;
    let arr = [];
    if (this.categoryId) {
      arr.push(this.categoryId);
    }
    if (this.brandId) {
      arr.push(this.brandId);
    }
    if (this.type) {
      arr.push(this.type);
    }
    for (let i = 0; i < arr.length; i++) {
      query += `&${arr[i].name}=${arr[i].value}`;
    }
    let publicaciones = this._pS.getPublicacionesCustomize(query)
      .subscribe(res => {
        this.listaPublicaciones = res;
        console.log('res: ', res);
        publicaciones.unsubscribe();
      });
  }

  getTipos() {
    this.listaTipos = this._pS.getTipoPublicacion();
  }

  changedCategory(event: any): void {
    this.categoryId = {
      name: 'categoryId',
      value: event.value
    };
    this.buscar();
  }

  changedBrand(event: any): void {
    this.brandId = {
      name: 'brandId',
      value: event.value
    };
    this.buscar();
  }

  changedType(event: any): void {
    this.type = {
      name: 'type',
      value: event.value
    };
    this.buscar();
  }

  StatusPubli(id, status) {
    let newstatus: number;
    if (status === 1) {
      newstatus = 2;
    } else {
      newstatus = 1;
    }
    let pstatus = this._pS.ModificarPub(id, {
      status: newstatus
    }).subscribe(res => {
      console.log(res);
      pstatus.unsubscribe();
    })

  }

}
