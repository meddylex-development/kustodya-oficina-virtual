import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbActionsModule,
  NbCardModule, 
  NbTooltipModule, 
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';

@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
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
    UserComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    DeleteAllComponent,
  ]
})
export class UserModule { }

