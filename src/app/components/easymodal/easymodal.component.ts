import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-easymodal',
  templateUrl: './easymodal.component.html',
  styleUrls: ['./easymodal.component.scss']
})
export class EasymodalComponent implements OnInit {

  // @Input('modalactive') modalactive;
  @Input('dataconfig') dataconfig:any;
  @Output() pasaBtnmodal = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    // console.log(this.dataconfig);
  }

  lanzar(event){
    this.dataconfig.activemodal = false;
    this.pasaBtnmodal.emit({nameBtnmodal: this.dataconfig.activemodal});
  }

  // closemodal(){
  //   this.dataconfig.activemodal = false;
  // }
}