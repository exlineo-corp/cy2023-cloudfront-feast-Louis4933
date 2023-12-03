import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { OrgaMenuComponent } from './template/orga-menu/orga-menu.component';
import { OrgaStocksComponent } from './pages/orga-stocks/orga-stocks.component';
import { OrgaEventsComponent } from './pages/orga-events/orga-events.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { SharedModule } from '../shared/shared.module';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddStockComponent } from './pages/add-stock/add-stock.component';
import { UpdateStockComponent } from './pages/update-stock/update-stock.component';

@NgModule({
  declarations: [
    AccueilComponent,
    OrgaMenuComponent,
    OrgaStocksComponent,
    OrgaEventsComponent,
    OrganisationComponent,
    AddEventComponent,
    UpdateEventComponent,
    AddStockComponent,
    UpdateStockComponent,
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OrganisationModule { }
