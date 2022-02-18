import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbTooltipModule,
} from '@nebular/theme';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReCaptchaModule } from 'angular-recaptcha3';

import { NgxLoginComponent } from '../_auth/login/login.component'; // <---
import { NgxRegisterComponent } from '../_auth/sign-up/sign-up.component'; // <---
import { NgxRequestPasswordComponent } from '../_auth/request-password/request-password.component'; // <---
import { ActivateAccountComponent } from '../_auth/activate-account/activate-account.component'; // <---
import { UpdatePasswordComponent } from '../_auth/update-password/update-password.component'; // <---
import { LogoutComponent } from '../_auth/sign-out/sign-out.component';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    ReCaptchaModule.forRoot({
      invisible: {
          sitekey: '6Lc8wGseAAAAAEU4RbYQR8eqvLC6_XUeq2vZbZxQ', 
      },
      normal: {
          sitekey: '6Lc8wGseAAAAAEU4RbYQR8eqvLC6_XUeq2vZbZxQ', 
      },
    }),
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbTooltipModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    // NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent, // <---
    NgxRegisterComponent, // <---
    NgxRequestPasswordComponent, // <---
    ActivateAccountComponent, // <---
    UpdatePasswordComponent, // <---
    LogoutComponent, // <---
  ],
})
export class NgxAuthModule {
}
