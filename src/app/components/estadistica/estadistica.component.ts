import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicarService } from '../../services/publicar.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {
  publicacion:any;
  idpubli:any;
  eDia:any[]=[];
  eSemana:any[]=[];
  eMes:any[]=[];
  nombresdataDia:any[]=[];
  cantdataDia:any[]=[];
  nombresdataSemana:any[]=[];
  cantdataSemana:any[]=[];
  nombresdataMes:any[]=[];
  cantdataMes:any[]=[];
  constructor(private _activatedRoute:ActivatedRoute, private _pS:PublicarService){
    this._activatedRoute.params
          .map(parametros=>parametros['id'])
          .subscribe(id=>{
            this.idpubli=id;
            console.log(this.idpubli);
           
          })
    
  }
  ngOnInit(){
            this.getPublicacion();
            this.getEstadisticas('day');
            this.getEstadisticas('week');
            this.getEstadisticas('month');
  }

  getPublicacion(){
     let publi = this._pS.getPublicacionId(this.idpubli)
                     .subscribe(res=>{
                       this.publicacion=res;
                       console.log(this.publicacion);
                     })
  }
  getEstadisticas(time){
    let est = this._pS.EstadisticasPub(this.idpubli,time)
                  .subscribe(res=>{
                    let tam;
                    let cantidad:any[]=[];
                    let nombres:any[]=[];                   
                    if(time=='day') {
                      this.eDia=res;
                      tam=this.eDia.length;
                      console.log('dia',this.eDia);
                      for (var i = 0; i < tam; ++i) {
                        cantidad.push(this.eDia[i].count);
                        nombres.push(this.eDia[i].name);
                      }
                      this.cantdataDia=cantidad;
                      this.nombresdataDia=nombres;
                      console.log('data',this.nombresdataDia);
                    }else if(time=='week') {
                      this.eSemana=res;
                      tam = this.eSemana.length;
                      console.log('semana',this.eSemana);
                      for (var i = 0; i < tam; ++i) {
                        cantidad.push(this.eSemana[i].count);
                        nombres.push(this.eSemana[i].name);
                      }
                      this.cantdataSemana=cantidad;
                      this.nombresdataSemana=nombres;
                      console.log('cant',this.cantdataSemana);
                      console.log('data',this.nombresdataSemana);
                    }else if(time=='month') {
                      this.eMes=res;
                      console.log('mes',this.eMes);
                      tam=this.eMes.length;
                      for (var i = 0; i < tam; ++i) {
                        cantidad.push(this.eMes[i].count);
                        nombres.push(this.eMes[i].name);
                      }
                      this.cantdataMes=cantidad;
                      this.nombresdataMes=nombres;
                      console.log('data',this.nombresdataMes);
                      console.log('cant',this.cantdataMes)
                    }
                    // est.unsubscribe();
                  })
  }
  public lineChartData:Array<any> = [
    65, 59, 80, 81, 56, 55, 40
  ];
  public lineChartLabels:Array<any>;
  public lineChartType:string = 'bar';
  public pieChartType:string = 'pie';
 
  public lineChartColors:Array<any> = [
    { // orange
      backgroundColor: 'rgba(255,87,34,0.2)',
      borderColor: 'rgba(255,87,34,1)',
      pointBackgroundColor: 'rgba(255,87,34,1)',
      pointBorderColor: '#FF5722',
      pointHoverBackgroundColor: '#FF5722',
      pointHoverBorderColor: 'rgba(255,87,34,0.8)'
    }
  ]
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  // public barChartLabels:string[] = ['Comentarios'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [95], label: 'Max.Comentarios'},
    {data: [78], label: 'Comentarios'}
  ];
 
}
