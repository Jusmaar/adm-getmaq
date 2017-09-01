import { Injectable } from '@angular/core';
import { UbigeoStatic } from '../data/ubigeo.class';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from './http-client.service';
import 'rxjs/add/operator/map';

@Injectable()

export class PublicarService {
    listaDepartamento: any[] = [];
    listaProvincia: any[] = [];
    listaDistrito: any[] = [];
    marcadores: any;
    lat: number;
    lng: number;
    idusuario: string;
    emailuser: string;

    tipo_publi: any[] = ['alquiler', 'venta'];
    condicion_publi: any[] = ['nuevo', 'usado'];
    ubigeo: any[] = (new UbigeoStatic).ubigeo;


    constructor(private http: HttpClient) {

    }

    getPublicacionId(id): Observable<any> {
        let ruta = `http://34.227.201.151:8080/publications/${id}?filter[include]=brand`;
        return this.http.get(ruta)
            .map(res => res.json());

    }

    getPublicaciones(id): Observable<any> {
        let ruta = `http://34.227.201.151:8080/publications-admin?usuarioId=${id}`;
        return this.http.get(ruta)
            .map(res => res.json());
    }

    getPublicacionesCustomize(query: string): Observable<any> {
        let ruta = `http://34.227.201.151:8080/publications-admin?${query}`;
        return this.http.get(ruta)
            .map(res => res.json());
    }

    getMarcas(): Observable<any> {
        let ruta = 'http://34.227.201.151:8080/brands';
        return this.http.get(ruta)
            .map(res => res.json());
    }

    getCatergorias(): Observable<any> {
        let ruta = 'http://34.227.201.151:8080/categories';
        return this.http.get(ruta)
            .map(res => res.json());
    }
    getTipoPublicacion() {
        return this.tipo_publi;
    }
    getCondicionPublicacion() {
        return this.condicion_publi;
    }
    getUbigeoDepartamento() {
        let j = 0;
        for (let i in this.ubigeo) {
            if ((this.ubigeo[i]['provincia'] === '00') && (this.ubigeo[i]['distrito'] === '00')) {
                this.listaDepartamento[j] = this.ubigeo[i];
                j++;
            }
        }
        // console.log( this.listaDepartamento );
        return this.listaDepartamento;
    }

    getUbigeoProvincia(depa) {
        //console.log( depa );
        let j = 0;
        this.listaProvincia = [];
        for (let i in this.ubigeo) {
            if ((this.ubigeo[i]['departamento'] == depa) && (this.ubigeo[i]['provincia'] != '00') && (this.ubigeo[i]['distrito'] === '00')) {
                this.listaProvincia[j] = this.ubigeo[i];
                j++;
            }
        }
        //console.log( this.listaProvincia );
        return this.listaProvincia;
    }

    getUbigeoDistrito(depart, provin) {
        let j = 0;
        this.listaDistrito = [];
        for (let i in this.ubigeo) {
            if ((this.ubigeo[i]['departamento'] == depart) && (this.ubigeo[i]['provincia'] == provin) && (this.ubigeo[i]['distrito'] != '00')) {
                this.listaDistrito[j] = this.ubigeo[i];
                j++;
            }
        }
        return this.listaDistrito;
    }

    uploadFile(files: any): Observable<any> {
        let url: string = 'http://34.227.201.151:8080/upload-image';
        return Observable.create(
            observer => {
                const request = new XMLHttpRequest();
                var formData: any = new FormData();
                files.forEach(element => {
                    formData.append("file", element);
                });
                // console.log(formData)
                request.onload = () => {
                    if (request.status === 200) {
                        observer.next(request);
                    } else {
                        observer.next(new Error(request.statusText));
                    }
                };
                request.onerror = () => {
                    observer.error(new Error('XMLHttpRequest error: ' + request.statusText));
                }
                request.open('POST', url);
                request.send(formData);
            }
        )
    }

    publicar(obj) {
        let ruta = 'http://34.227.201.151:8080/publications';
        let data = JSON.stringify(obj);
        return this.http.post(ruta, data)
            .map(res => {
                const data1 = res.json();
                return data1;
            })
    }

    ModificarPub(id, obj) {
        let ruta = `http://34.227.201.151:8080/publications/${id}`
        let data = JSON.stringify(obj);
        return this.http.put(ruta, obj)
            .map(res => {
                const data1 = res.json();
                return data1;
            })
    }
}
