import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { OrgaEventsComponent } from './pages/orga-events/orga-events.component';
import { OrgaStocksComponent } from './pages/orga-stocks/orga-stocks.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { AddStockComponent } from './pages/add-stock/add-stock.component';
import { UpdateStockComponent } from './pages/update-stock/update-stock.component';

const routes: Routes = [
  { path : '', component: OrganisationComponent , children: [
    { path : '', component: AccueilComponent },
    { path : 'events', component: OrgaEventsComponent },
    { path : 'stocks', component: OrgaStocksComponent },
    { path : 'events/add', component: AddEventComponent },
    { path : 'events/update/:id', component: UpdateEventComponent },
    { path : 'stocks/add', component: AddStockComponent },
    { path : 'stocks/update/:id', component: UpdateStockComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }
