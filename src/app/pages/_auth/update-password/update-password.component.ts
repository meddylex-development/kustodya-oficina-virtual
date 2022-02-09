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
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends NbRequestPasswordComponent implements OnInit {

  public redirectDelay: number;
  public showMessages: any;
  public strategy: string;
  public submitted: boolean;
  public errors: string[];
  public messages: string[];
  public user: any;

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

  fnRedirectPage(time: number) {
    this.submitted = true;
    setTimeout(() => {
      this.router.navigate(['auth/login']);
    }, time);  // 5s
  }

  // getConfigValue(data) {
  //   console.log('data: ', data);
  // }

  resetPass() {
    console.log('Hola reset');
  }

}
