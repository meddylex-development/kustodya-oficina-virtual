import { 
  Component,
  OnInit, 
  ChangeDetectorRef, 
  ChangeDetectionStrategy, 
  Inject } from '@angular/core';
import { 
  NbLoginComponent, 
  NbAuthJWTToken, 
  NbAuthResult, 
  NbAuthService, 
  NbAuthSocialLink, 
  NB_AUTH_OPTIONS, 
  getDeepFromObject, 
  NbResetPasswordComponent } from '@nebular/auth';
  import { NbTooltipModule } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';



@Component({
  selector: 'ngx-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent extends NbResetPasswordComponent implements OnInit {
  
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

  updatePass(new_password: any, confirm_new_password: any) {

  }

  fnRedirectPage(time: number) {
    this.submitted = true;
    setTimeout(() => {
      this.router.navigate(['auth/login']);
    }, time);  // 5s
  }

  // fnGetEmail(token) {
  //   let object_decode_token = this.utilitiesService.fnDecodeToken(token);
  //   if (object_decode_token['email'] != '') {
  //     // this.email = object_decode_token['email'];
  //   } else {
  //     this.utilitiesService.showToast('top-right', 'danger', 'El link es invalido!')
  //   }
  // }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject({}, 'name', null);
  // }

  resetPass() {

  }

}
