import { 
  Component,
  OnInit, 
  ChangeDetectorRef, 
  ChangeDetectionStrategy, 
  Inject } from '@angular/core';
import { 
  NbRegisterComponent, 
  NbAuthJWTToken, 
  NbAuthResult, 
  NbAuthService, 
  NbAuthSocialLink, 
  NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { DocumentTypeService } from 'app/shared/api/services/document-type.service';
import { UserService } from 'app/shared/api/services/user.service';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent implements OnInit {
  
  public redirectDelay: number;
  public showMessages: any;
  public strategy: string;
  public submitted: boolean;
  public errors: string[];
  public messages: string[];
  public user: any;
  public socialLinks: NbAuthSocialLink[];
  public collectionDocumentType: any = [];

  public siteKey: string = "6Lc8wGseAAAAAEU4RbYQR8eqvLC6_XUeq2vZbZxQ";
  public size: any = "normal"; // Normal - compact - invisible
  public lang: string = "es";
  public type: string = "image";
  public theme: string = "light";
  public hide: boolean = false;
  public token: string;
  public collectionList: any = [];
  public collectionListOriginal: any = [];

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'signUpComponent';

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';


  constructor(
    private utilitiesService: UtilitiesService, 
    private documentTypeService: DocumentTypeService,
    private userService: UserService,
    private bsLocaleService: BsLocaleService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    ) {
    super(service, options, cd, router);
  }

  ngOnInit() {
    // this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // // this.language = 'EN';
    // console.log('this.language: ', this.language);
    // this.utilitiesService.fnSetLocalStorage("lang", this.language);
    // this.fnGetDataLanguages(this.language, this.nameComponent);
    // this.fnGetDataAccess();
    this.token = '';
    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // this.language = "EN";
    // this.lang = this.language.toLowerCase();
    console.log('this.lang: ', this.lang);
    console.log('this.language: ', this.language);
    this.bsLocaleService.use(this.lang);
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetList(this.token).then((responseData) => {
      if(responseData['body']['stateRequest']) {
        this.collectionList = responseData['body']['data'];
        this.collectionListOriginal = responseData['body']['data'];
      } else {
        this.collectionList = []
        this.collectionListOriginal = [];
      }
    });
  }

  fnGetList(token) {
    return new Promise((resolve, reject) => {
      this.documentTypeService.fnHttpGetDocumentTypeList(token).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSetDocumentType(data_document) {
    console.log('data_document: ', data_document);
  }

  onCaptchaExpired(event) {
    console.log(event);
    this.user['captcha'] = {
      checked: false,
      data: event,
    }
  }

  onCaptchaResponse(event) {
      console.log(event);
      this.user['captcha'] = {
        checked: true,
        data: event,
      }
  }

  register() {
    this.submitted = true;
    // this.user
    console.log('this.user: ', this.user);

    if (
      this.user['documentType'] && 
      this.user['documentNumber'] && 
      this.user['documentDateExpedition'] && 
      this.user['email'] &&
      this.user['password'] && 
      this.user['confirmPassword'] && 
      this.user['phoneNumber'] && 
      this.user['terms'] && 
      this.user['captcha']
    ) {
      let dataObjectSend = {
        firstName: '',
        secondFirstName: '',
        lastName: '',
        secondLastName: '',
        idDocumentType: this.user['documentType']['_id'],
        idCountry: '',
        idCity: '',
        documentNumber: this.user['documentNumber'],
        email: this.user['email'],
        password: this.user['confirmPassword'],
        address: '',
        phoneNumber: this.user['phoneNumber'],
        birthDate: '',
        documentDateExpedition: this.utilitiesService.getDateValueOf(this.user['documentDateExpedition']),
        acceptTerms: this.user['terms'],
        captcha: this.user['captcha']['checked'],
      };
      console.log('dataObjectSend: ', dataObjectSend);
      this.userService.fnHttpSetAddNewUserAuth('', dataObjectSend).subscribe((response) => {
        console.log('response: ', response);
        if (response.status != 200) {
          this.submitted = false;
          this.utilitiesService.showToast('top-right', 'danger', response['body']['data'], 'nb-alert');
        } else {
          this.submitted = false;
          this.user = {};
          this.utilitiesService.showToast('top-right', 'success', "Usuario registrado satisfactoriamente!", 'fas fa-check');
          this.utilitiesService.fnRedirectPage(3000);
        }
      });
    } else {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', 'danger', 'Los datos del usuario estan incompletos!', 'nb-alert');
    }

  }
  
  
}
