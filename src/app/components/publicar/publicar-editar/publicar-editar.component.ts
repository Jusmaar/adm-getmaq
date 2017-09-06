import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileItem } from "../../../models/file-item";
import { ActivatedRoute } from '@angular/router';
import { PublicarService } from '../../../services/publicar.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-publicar-editar',
  templateUrl: './publicar-editar.component.html',
  styleUrls: ['./publicar-editar.component.scss']
})
export class PublicarEditarComponent implements OnInit {
  misdatosdataconfig: any = {
    'activemodal': false,
    'titulo': 'Mensaje de Easymaq',
    'descripcion': 'En unos momentos le estaremos informando a su correo'

  };
  btnupdate: boolean = true;
  visible: boolean = false;
  estaSobreDropZone: boolean = false;
  idpubli: any;
  archivos: FileItem[] = [];
  direcci: any;
  lat: any;
  lon: any;
  publicacionId: any = {};
  selectTipo: any;
  selectCategoria: any;
  selectDepartamento: any;
  selectProvincia: any;
  selectDistrito: any;
  checkconsultar: any;
  listaDistrito: any[] = [];
  listaCategorias: any[] = [];
  listaDepartamento: any[] = [];
  listaProvincia: any[] = [];
  tipos: any[] = [];
  condiciones: any[] = [];
  listaMarcas: any[] = [];
  selectCondicion: any;
  marca: any;
  modelo: any;
  ano: any;
  horas_maquina: any;
  descripcion: any;
  nombre: any;
  apellido: any;
  contacto_tel1: any;
  contacto_tel2: any;
  email: any;
  precio: any;
  moneda: any;
  tipo_alq: any;
  horario: any;
  imagespublicacion: any[] = [];
  misavisosmapa: any;
  constructor(private activatedRoute: ActivatedRoute, private _pS: PublicarService, private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params
      .map(parametros => parametros['id'])
      .subscribe(id => {
        this.idpubli = id;
        console.log(id);
        this.getPublicacion(this.idpubli);
      })
    this.getMarcas();

  }
  confirm(text: string) {
    this.misdatosdataconfig.activemodal = true;
    this.misdatosdataconfig.descripcion = text;
  }
  getPublicacion(id) {
    let idpublicacion = this._pS.getPublicacionId(this.idpubli)
      .subscribe(res => {
        console.log(res);
        this.publicacionId = res;
        console.log(this.publicacionId);
        this.tipos = this._pS.getTipoPublicacion();
        this.condiciones = this._pS.getCondicionPublicacion();
        this._pS.getCatergorias().subscribe(res => {
          // console.log(res)
          this.listaCategorias = res;
          console.log(this.listaCategorias);
        });;
        this.listaDepartamento = this._pS.getUbigeoDepartamento();
        this.selectDepartamento = this.publicacionId.uDepartamento;
        this.listaProvincia = this._pS.getUbigeoProvincia(this.selectDepartamento);
        this.selectTipo = this.publicacionId.operacion;
        this.selectCategoria = this.publicacionId.categoryId;
        this.selectProvincia = this.publicacionId.uProvincia;
        this.listaDistrito = this._pS.getUbigeoDistrito(this.selectDepartamento, this.selectProvincia);
        this.selectDistrito = this.publicacionId.uDistrito;
        this.checkconsultar = this.publicacionId.prConsultar;
        this.precio=this.publicacionId.prPrecio;
        this.selectCondicion = this.publicacionId.condicion;
        this.marca = this.publicacionId.brandId;
        this.moneda=this.publicacionId.prMoneda;
        this.modelo = this.publicacionId.modelo;
        this.ano = this.publicacionId.age;
        this.horas_maquina = this.publicacionId.horasMaquina;
        this.descripcion = this.publicacionId.description;
        this.nombre = this.publicacionId.ctName;
        this.apellido = this.publicacionId.ctLastName;
        this.contacto_tel1 = this.publicacionId.ctPhone01;
        this.contacto_tel2 = this.publicacionId.ctPhone02;
        this.email = this.publicacionId.ctEmail;
        this.horario = this.publicacionId.ctHorario;
        this.imagespublicacion = this.publicacionId.urlImages;
        this.misavisosmapa = {
          direccion: this.publicacionId.uDireccion,
          latitud: this.publicacionId.location.lat,
          longitud: this.publicacionId.location.lng
        };
        console.log(this.misavisosmapa);
        // console.log(this.direcci);
        idpublicacion.unsubscribe();
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

  archivosImagenes(event) {
    // console.log(event);
    this.archivos = event;
    // console.log(this.archivos);
  }
  archivosSobreDropZone(e: boolean) {
    this.estaSobreDropZone = e;
  }
  deleteimage(i: number) {
    this.archivos.splice(i, 1);
    // console.log(this.archivos);
    return this.archivos;
  }

  prueba() {
    console.log(this.selectTipo);
  }

  showBtnDireccion(event) {
    this.direcci = event.nameBtndireccion;
    this.lat = event.nameLatitud;
    this.lon = event.nameLongitud;
    console.log(this.lat, this.lon);
    // localStorage.setItem("direccion", this.direcci);
    // localStorage.setItem("latitud", this.lat);
    // localStorage.setItem("longitud", this.lon);
  }
  showBtnmodal(event) {
    this.misdatosdataconfig.activemodal = event.nameBtnmodal;
    this.router.navigate(['/publicaciones']);
  }

  submit() {
    this.visible = true;
    this.btnupdate = false;
    let objpubli =
      {
        ctName: this.nombre,
        ctLastName: this.apellido,
        ctEmail: this.email,
        ctPhone01: this.contacto_tel1,
        ctPhone02: this.contacto_tel2,
        ctHorario: this.horario,
        uDepartamento: this.selectDepartamento,
        uDistrito: this.selectDistrito,
        uProvincia: this.selectProvincia,
        uDireccion: this.direcci,
        prConsultar: this.checkconsultar,
        prTipoAlquiler: this.tipo_alq,
        prMoneda: this.moneda,
        prPrecio: this.precio,
        condicion: this.selectCondicion,
        age: this.ano,
        description: this.descripcion,
        horasMaquina: this.horas_maquina,
        operacion: this.selectTipo,
        dateUpdate: ((new Date()).toISOString()),
        location: {
          lat: this.lat,
          lng: this.lon
        },
        clientId: JSON.parse(localStorage.getItem('client')).id,
        categoryId: this.selectCategoria,
        modelo: this.modelo,
        companyId: JSON.parse(localStorage.getItem('client')).company.id,
        brandId: this.marca
      }
    console.log(objpubli);
    let updatepubli = this._pS.ModificarPub(this.idpubli, objpubli)
      .subscribe(res => {
        this.visible = false;
        this.btnupdate = true;
        console.log(this.selectCondicion);
        this.confirm('Publicacion actualizada con exito');
        // setTimeout(() => {
        //   this.router.navigate(['/publicaciones']);
        // }, 5000);
        // this.router.navigate(['/publicaciones']);
      })
  }

}
