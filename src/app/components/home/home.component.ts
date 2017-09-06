import { Component,OnInit} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { PublicarService } from '../../services/publicar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent  implements OnInit{
  iduser:any;
  cantPubli:any;
  ultimasPublic:any[]=[];

  constructor(private _publicarService:PublicarService){

  }
  ngOnInit(){
    this.iduser = JSON.parse(localStorage.getItem('client')).id;
    this.getListaPublicaciones();
  }

  getListaPublicaciones() {
    let publicaciones = this._publicarService.getPublicaciones(this.iduser)
      .subscribe(res => {
        console.log(res);
        this.cantPubli=res.length;
        this.ultimasPublic.push(res[this.cantPubli-1],res[this.cantPubli-2],res[this.cantPubli-3]);
        console.log(this.cantPubli);
        console.log(this.ultimasPublic);
        publicaciones.unsubscribe();
      });

  }

    public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // orange
      backgroundColor: 'rgba(255,87,34,0.2)',
      borderColor: 'rgba(255,87,34,1)',
      pointBackgroundColor: 'rgba(255,87,34,1)',
      pointBorderColor: '#FF5722',
      pointHoverBackgroundColor: '#FF5722',
      pointHoverBorderColor: 'rgba(255,87,34,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'bar';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
