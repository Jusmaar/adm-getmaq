import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileItem } from "../../../models/file-item";
import { PublicarService } from '../../../services/publicar.service';

@Component({
  selector: 'app-publicar-nuevo',
  templateUrl: './publicar-nuevo.component.html',
  styleUrls: ['./publicar-nuevo.component.scss']
})
export class PublicarNuevoComponent implements OnInit {
  misdatosdataconfig: any = {
        'activemodal': false,
        'titulo': 'Mensaje de Easymaq',
        'descripcion': 'En unos momentos le estaremos informando a su correo'

  };
  archivos: FileItem[] = [];
  estaSobreDropZone: boolean = false;
  tipos: any[] = [];
  condiciones: any[] = [];
  listaDepartamento: any[] = [];
  listaProvincia: any[] = [];
  listaDistrito: any[] = [];
  listaCategorias: any[] = [];
  listaMarcas:any[]=[];
  btnpublicar:boolean=true;
  visible: boolean = false;
  /*******Formulario********************/
  checkconsultar: boolean = false;
  selectTipo: any;
  selectDepartamento: any;
  selectProvincia: any;
  selectDistrito: any;
  selectCategoria:any;
  condicion: any;
  tipo_alq: any;
  moneda: any;
  ano: any;
  horas_maquina: any;
  descripcion: any;
  nombre: any;
  apellido: any;
  contacto_tel1: any;
  contacto_tel2: any;
  email: any;
  horario: any;
  direcci: any;
  lat: any;
  lon: any;
  precio: any;
  marca: any;
  modelo: any;
  forma:NgForm;

  constructor(private _publicarService: PublicarService) {
    this.listaDepartamento = _publicarService.getUbigeoDepartamento();
    this.tipos = _publicarService.getTipoPublicacion();
    this.condiciones = _publicarService.getCondicionPublicacion();
  }

  ngOnInit() {
    this.getCaterogia();
    this.getMarcas();
  }
  confirm(texto:string){
    this.misdatosdataconfig.activemodal=true;
    this.misdatosdataconfig.descripcion=texto;
  }

  getMarcas(){
    let mar = this._publicarService.getMarcas()
              .subscribe(res=>{
                this.listaMarcas=res;
                console.log(this.listaMarcas);
                mar.unsubscribe;
              });
  }

  getCaterogia() {
    let cat = this._publicarService.getCatergorias()
      .subscribe(res => {
        this.listaCategorias = res;
        cat.unsubscribe();
      });
  }

  getProvincia() {
    this.listaProvincia = [];
    this.selectProvincia = null;
    this.selectDistrito = null;
    this.listaProvincia = this._publicarService.getUbigeoProvincia(this.selectDepartamento);
  }

  getDistrito() {
    this.listaDistrito = [];
    this.selectDistrito = null;
    this.listaDistrito = this._publicarService.getUbigeoDistrito(this.selectDepartamento, this.selectProvincia);
  }
  deleteimage(i: number) {
    this.archivos.splice(i, 1);
    return this.archivos;
  }


  showBtnDireccion(event) {
    this.direcci = event.nameBtndireccion;
    this.lat = event.nameLatitud;
    this.lon = event.nameLongitud;
    localStorage.setItem("direccion", this.direcci);
    localStorage.setItem("latitud", this.lat);
    localStorage.setItem("longitud", this.lon);
  }
  archivosImagenes(event) {
    this.archivos = event;
  }
  archivosSobreDropZone(e: boolean) {
    this.estaSobreDropZone = e;
  }


  submit(forma): void {
    this.visible = true;
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
        uReferencia: "asdasd",
        prConsultar: this.checkconsultar,
        prTipoAlquiler: this.tipo_alq,
        prMoneda: this.moneda,
        prPrecio: this.precio,
        prPrecioOferta: "asdasd",
        condicion: this.condicion,
        age: this.ano,
        description: this.descripcion,
        horasMaquina: this.horas_maquina,
        operacion: this.selectTipo,
        dateCreated: ((new Date()).toISOString()),
        urlImages: "asdasd",
        location: {
          lat: this.lat,
          lng: this.lon
        },
        usuarioId: JSON.parse(localStorage.getItem('client')).id,
        categoryId: this.selectCategoria,
        countryId: JSON.parse(localStorage.getItem('client')).countryId,
        modelo: this.modelo,
        companyId: JSON.parse(localStorage.getItem('client')).company.id,
        brandId: this.marca
      }
    if(this.marca== undefined|| this.modelo== undefined || this.ano== undefined || this.contacto_tel1== undefined || this.email == undefined){
        this.confirm('Asegúrese de haber llenado todos los datos obligatorios(*) del formulario');
        this.visible = false;
    }else if(this.archivos.length==0){
        this.confirm('Agregue imagenes a su publicacion');
        this.visible = false;
    }else{
      this.btnpublicar=false;
      let files = [];
      this.archivos.forEach((obj) => {
        files.push(obj.archivo);
      });
      this._publicarService.uploadFile(files)
        .subscribe((res: any) => {
          var result = JSON.parse(res.response).data;
          objpubli.urlImages = result;
          let publi = this._publicarService.publicar(objpubli)
            .subscribe((res: any) => {
              this.visible = false;
              this.archivos.length=0;
              forma.reset();
              this.btnpublicar=true;
              this.confirm('Publicacion realizada con exito');
            });
        });
      }
  }

}
