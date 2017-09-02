import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import{Router} from '@angular/router'
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  /* subForm: Subscription; */

  constructor(
    private service: AdminService,
    private router:Router
  ) { }
  misdatosdataconfig: any = {
        'activemodal': false,
        'titulo': 'Mensaje de Getmaq',
        'descripcion': 'En unos momentos le estaremos informando a su correo'

  };

  ngOnInit() {
  }

  ngOnDestroy(): void {
    /* this.subForm.unsubscribe(); */
  }
  confirm(des:string){
    this.misdatosdataconfig.activemodal=true;
    this.misdatosdataconfig.descripcion=des;
  }

  submit(name,pass,correo){
    let obj = {
      email: name,
      password: pass
    }
    console.log(name+'-'+pass)
    if(name == "" || pass == ""){
        this.confirm('Asegurese haber llenado los campos');
    }else if(!correo.valid){
        this.confirm('Error en el formato de correo');
    }else{ 
      let subForm: Subscription = this.service.login('http://34.227.201.151:8080/usuarios/login?include=user', obj)
        .subscribe((res: any) => {
          console.log('res: ', res);
          this.service.set(res);
        }, (err: any) => {
          console.log('err : ', err);
          this.confirm("Correo o contraseña ingresados son incorrectos")
        }, () => {
          console.log('complete');
          subForm.unsubscribe();
          this.router.navigate(['/publicaciones']);
        });
    }
      
  }

}
