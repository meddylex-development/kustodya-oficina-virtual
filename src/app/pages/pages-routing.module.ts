import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from 'app/shared/api/services/auth-guard.service';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateComponent } from './state/state.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { MenuComponent } from './menu/menu.component';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      // canActivate: [AuthGuard],
      component: DashboardComponent,
    }, {
      path: 'dashboard',
      // canActivate: [AuthGuard],
      component: DashboardComponent,
    }, {
      path: 'state',
      // canActivate: [AuthGuard],
      component: StateComponent,
    }, {
      path: 'profile',
      // canActivate: [AuthGuard],
      component: ProfileComponent,
    }, {
      path: 'document-type',
      // canActivate: [AuthGuard],
      component: DocumentTypeComponent,
    }, {
      path: 'country',
      // canActivate: [AuthGuard],
      component: CountryComponent,
    }, {
      path: 'city',
      // canActivate: [AuthGuard],
      component: CityComponent,
    }, {
      path: 'menu',
      // canActivate: [AuthGuard],
      component: MenuComponent,
    }, {
      path: 'menu-profile',
      // canActivate: [AuthGuard],
      component: MenuProfileComponent,
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
