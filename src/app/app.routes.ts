import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component'; 
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { PublicarComponent } from './components/publicar/publicar.component';
import { PUBLICAR_ROUTES } from './components/publicar/publicar.routes';
import { LoginGuard } from './services/login.guard.service';
import { ComponentGuard } from './services/component.guard.service';

const APP_ROUTES:Routes = [
    { path:'login', component: LoginComponent,
        canActivate: [LoginGuard]
    },
    { path:'home', component : HomeComponent, canActivate: [ComponentGuard]},
    { path:'publicaciones', component : PublicacionesComponent, canActivate: [ComponentGuard] },
    { 
    	path:'publicar' ,
    	component: PublicarComponent,
    	children:PUBLICAR_ROUTES
    },
    { path:'estadistica/:id' , component: EstadisticaComponent, canActivate: [ComponentGuard] },
    { path:'**', pathMatch:'full', redirectTo:'home' }
];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);