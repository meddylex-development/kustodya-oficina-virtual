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
  NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {

  public redirectDelay: number;
  public showMessages: any;
  public strategy: string;
  public errors: string[];
  public messages: string[];
  public user: any;
  public submitted: boolean;
  public socialLinks: NbAuthSocialLink[];
  public rememberMe: boolean;
  
  public DATA_LANG: any = null;
  public language: string = '';
  public nameComponent: string = 'loginComponent';
  public urlLogo: string = '';

  public token: string = "";

  constructor(
    private utilitiesService: UtilitiesService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router
    ) {
    super(service, options, cd, router);
  }

  ngOnInit() {
    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // this.language = 'EN';
    console.log('this.language: ', this.language);
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataAccess();
  }

  fnGetDataAccess() {
    let urlLogo = 'UrlLogo';
    this.utilitiesService.fnGetDataFBCallback(urlLogo, (response) => {
      this.urlLogo = response;
    });
  }

  fnGetDataLanguages(language, nameComponent) {
    let urlCollection = 'Languages/' + language + '/' + nameComponent;
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      this.DATA_LANG = response;
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    // this.user['getToken'] = true;

    const obj_user_account = {
      'password': this.user['password'],
      'email': this.user['email'],
      // 'rememberMe': true,
      'getToken': true,
    };

    // this.service.authenticate(this.strategy, obj_user_account).subscribe((resultAuth: NbAuthResult) => {
    //   if (resultAuth.isSuccess() && resultAuth.getMessages()[0]['status'] === 200) {
    //     this.messages = resultAuth.getMessages();
    //     this.token = this.messages[0]['body']['jwt'];
    //     this.utilitiesService.fnSetToken(this.token);
    //   }
    // },(error) => {
    // });

    console.log('obj_user_account: ', obj_user_account);
    this.service.authenticate(this.strategy, obj_user_account).subscribe((result: NbAuthResult) => {
      console.log('result: ', result);
      if (result.isSuccess()) {
        if (result['response']['status'] == 200){
          localStorage.setItem('userData', JSON.stringify(result['response']['body']['user']));
          const redirect = result.getRedirect();
          this.router.navigateByUrl(redirect);
        }
        if (result['response']['status'] == 206) {
          this.submitted = false;
          this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
        }
      } else {
        this.submitted = false;
        if (result.getErrors()[0]['status'] == 500) {
          this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
        }
      }
      this.cd.detectChanges();
    });

  }

}
