import { Routes } from '@angular/router';
import {PublicarNuevoComponent} from './publicar-nuevo/publicar-nuevo.component';
import {PublicarEditarComponent} from './publicar-editar/publicar-editar.component';
import { ComponentGuard } from '../../services/component.guard.service';

export const PUBLICAR_ROUTES: Routes = [
	{path:'nuevo',component:PublicarNuevoComponent, canActivate: [ComponentGuard]},
	{path:'editar/:id',component:PublicarEditarComponent, canActivate: [ComponentGuard]},
	{path:'**',pathMatch:'full',redirectTo:'nuevo'}
];


