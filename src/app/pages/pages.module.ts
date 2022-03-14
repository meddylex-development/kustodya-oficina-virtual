import { NgModule } from '@angular/core';
import { 
  NbMenuModule, 
  NbCardModule, 
  NbTooltipModule, 
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { StateModule } from './state/state.module';
import { ProfileModule } from './profile/profile.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { MenuModule } from './menu/menu.module';
import { MenuProfileModule } from './menu-profile/menu-profile.module';
import { UserModule } from './user/user.module';
import { TranscripcionModule } from './transcripcion/transcripcion.module';

@NgModule({
  imports: [
    // NbSpinnerModule,
    PagesRoutingModule,
    NgxPaginationModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    NbCardModule,
    NbTooltipModule,
    NgSelectModule,
    DashboardModule,
    StateModule,
    ProfileModule,
    DocumentTypeModule,
    CountryModule,
    CityModule,
    MenuModule,
    MenuProfileModule,
    UserModule,
    TranscripcionModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
