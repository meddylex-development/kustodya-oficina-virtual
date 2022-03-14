import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbActionsModule,
  NbCardModule, 
  NbTooltipModule, 
  NbButtonModule,
  NbInputModule, 
  NbSpinnerModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranscripcionComponent } from './transcripcion.component';
import { ListComponent } from './list/list.component';
import { AddTranscriptionComponent } from './add/add.component';
import { PreviewComponent } from './preview/preview.component';



@NgModule({
  declarations: [
    TranscripcionComponent, 
    ListComponent,
    AddTranscriptionComponent, 
    PreviewComponent
  ],
  imports: [
    CommonModule,
    TimepickerModule.forRoot(),
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
    NbSpinnerModule,
  ],
})
export class TranscripcionModule { }
