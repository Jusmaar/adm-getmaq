import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  name_emp:any;
  img_emp:any;
  constructor() { }

  ngOnInit() {
    this.name_emp=JSON.parse(localStorage.getItem('client')).name;
    this.img_emp=JSON.parse(localStorage.getItem('client')).company.urlImage;
    console.log(this.name_emp);
    console.log(this.img_emp);
  }

  logout(){
    localStorage.removeItem('client');
  }
}
