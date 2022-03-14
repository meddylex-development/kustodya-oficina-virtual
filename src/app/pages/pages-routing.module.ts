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
import { UserComponent } from './user/user.component';
import { AddComponent } from './user/add/add.component';
import { EditComponent } from './user/edit/edit.component';
import { TranscripcionComponent } from './transcripcion/transcripcion.component';
import { AddTranscriptionComponent } from './transcripcion/add/add.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      // canActivate: [AuthGuard],
      component: DashboardComponent,
    }, {
      path: 'user',
      // canActivate: [AuthGuard],
      // component: UserComponent,
      children: [
        {
          path: 'list',
          component: UserComponent,
        },
        {
          path: 'add-user',
          component: AddComponent,
        },
        {
          path: 'edit-user',
          component: EditComponent,
        },
      ]
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
      path: 'transcripcion',
      // canActivate: [AuthGuard],
      // component: MenuProfileComponent,
      children: [
        {
          path: 'lista-transcripciones',
          component: TranscripcionComponent,
        },
        {
          path: 'transcribir-incapacidad',
          component: AddTranscriptionComponent,
        },
      ]
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
