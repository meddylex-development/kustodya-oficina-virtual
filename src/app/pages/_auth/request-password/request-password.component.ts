import { 
  Component, 
  OnInit, 
  ChangeDetectorRef, 
  Inject } from '@angular/core';
import {  } from '@nebular/auth';
import { 
  NbRequestPasswordComponent, 
  NbAuthService, 
  NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';


@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class NgxRequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  redirectDelay: number;
  showMessages: any;
  strategy: string;
  submitted: boolean;
  errors: string[];
  messages: string[];
  user: any;

  constructor(
    private utilitiesService: UtilitiesService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {
  }
}
