import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GestionProfilsComponent } from './pages/gestion-profils/gestion-profils.component';
import { ParametresComponent } from './pages/parametres/parametres.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

const routes: Routes = [
  { path: '' , component: AdminComponent, children: [
    { path: '', component: GestionProfilsComponent },
    { path: 'params', component: ParametresComponent },
    { path: 'update/:id', component: UpdateUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
