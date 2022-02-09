import { NgModule } from '@angular/core';
import { 
  NbActionsModule,
  NbCardModule, 
  NbTooltipModule, 
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';

import { CountryComponent } from './country.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';

@NgModule({
  imports: [
    FormsModule,
    NbActionsModule,
    NbCardModule,
    NbTooltipModule,
    ThemeModule,
    NgxPaginationModule,
    NbButtonModule,
    NbInputModule,
    NgSelectModule,
  ],
  declarations: [
    CountryComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    DeleteAllComponent,
  ],
})
export class CountryModule { }

