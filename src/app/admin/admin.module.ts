import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionProfilsComponent } from './pages/gestion-profils/gestion-profils.component';
import { ParametresComponent } from './pages/parametres/parametres.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GestionProfilsComponent,
    ParametresComponent,
    AdminComponent,
    UpdateUserComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
