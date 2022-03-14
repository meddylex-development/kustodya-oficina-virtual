import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from 'app/shared/api/services/utilities.service';
import { StateService } from 'app/shared/api/services/state.service';
import { UserService } from 'app/shared/api/services/user.service';
import { DocumentTypeService } from 'app/shared/api/services/document-type.service';
import { ProfileService } from 'app/shared/api/services/profile.service';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  // @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public user: any = {};

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'userComponent';
  public collectionDocumentTypesList: any = [];
  public collectionDocumentTypesListOriginal: any = [];
  public collectionStatesList: any = [];
  public collectionStatesListOriginal: any = [];
  public collectionProfiles: any = [];
  public collectionProfilesOriginal: any = [];
  public collectionList: any = [];
  public lang: string = "es";

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';
  
  constructor(
    // protected ref: NbDialogRef<AddComponent>,
    private documentTypeService: DocumentTypeService,
    private utilitiesService: UtilitiesService,
    private userService: UserService,
    private stateService: StateService,
    private profileService: ProfileService,
    private bsLocaleService: BsLocaleService,
  ) { }

  ngOnInit(): void {
    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    console.log('this.language: ', this.language);
    this.language = 'EN';
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataGeneralLanguages(this.language);

    this.bsLocaleService.use(this.lang);

    let data = this.utilitiesService.fnGetDataShare();
    console.log('data: ', data);
    if (data) {
      this.user = data['dataUser'];
      console.log('this.user: ', this.user);
      this.user['documentType'] = data['dataUser']['idDocumentType'];
      this.user['documentDateExpedition'] = (data['dataUser']['documentDateExpedition']) ? this.utilitiesService.getDateFormat(data['dataUser']['documentDateExpedition'], null) : '';
      this.user['profile'] = data['dataUser']['idProfile'];
      this.user['state'] = data['dataUser']['idState'];

      this.utilitiesService.fnAuthValidUser().then(response => {
        this.token = response['token'];
        this.userData = response['user'];
  
        Promise.all([
          this.fnGetListDocumentTypes(this.token), 
          this.fnGetListState(this.token),
          this.fnGetListProfile(this.token),
        ]).then((respPromise) => {
          console.log('respPromise: ', respPromise);
          let dataDocumentType = respPromise[0];
          let dataStates = respPromise[1];
          let dataProfiles = respPromise[2];
          if(dataStates['body']['stateRequest']) {
            this.collectionStatesList = dataStates['body']['state'];
            this.collectionStatesListOriginal = dataStates['body']['state'];
          } else {
            this.collectionStatesList = []
            this.collectionStatesListOriginal = [];
          }
          if(dataDocumentType['body']['stateRequest']) {
            this.collectionDocumentTypesList = dataDocumentType['body']['data'];
            this.collectionDocumentTypesListOriginal = dataDocumentType['body']['data'];
          } else {
            this.collectionDocumentTypesList = []
            this.collectionDocumentTypesListOriginal = [];
          }
          if(dataProfiles['body']['stateRequest']) {
            this.collectionProfiles = dataProfiles['body']['profile'];
            this.collectionProfilesOriginal = dataProfiles['body']['profile'];
          } else {
            this.collectionProfiles = []
            this.collectionProfilesOriginal = [];
          }
        });
  
      }).catch(error => {
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.utilitiesService.fnNavigateByUrl('auth/login');
        })
      });
      
    } else {
      this.utilitiesService.fnNavigateByUrl('pages/user/list');
    }

  }

  fnGetDataLanguages(language, nameComponent) {
    let urlCollection = 'Languages/' + language + '/' + nameComponent;
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      this.DATA_LANG = response;
    });
  }
  
  fnGetDataGeneralLanguages(language) {
    let urlCollection = 'GeneralLanguages/' + language;
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      this.DATA_LANG_GENERAL = response;
    });
  }

  fnGetListDocumentTypes(token) {
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

  fnGetListState(token) {
    return new Promise((resolve, reject) => {
      this.stateService.fnHttpGetStateList(token).subscribe(response => {
        const data = response['body']['state'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetListProfile(token) {
    return new Promise((resolve, reject) => {
      this.profileService.fnHttpGetProfileList(token).subscribe(response => {
        const data = response['body']['profile'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSetStatusUser(data_user) {
    this.user['idState'] = data_user['_id'];
  }

  fnSetDocumentType(data_document) {
    console.log('data_document: ', data_document);
  }
  
  fnSetState(state) {
    console.log('state: ', state);
  }
  
  fnSetProfile(profile) {
    console.log('profile: ', profile);
  }

  editUser() {
    this.submitted = true;
    // this.user
    console.log('this.user: ', this.user);
    if (
      this.user['firstName'] && 
      this.user['lastName'] && 
      this.user['email'] && 
      this.user['documentType'] && 
      this.user['documentNumber'] && 
      this.user['documentDateExpedition'] && 
      this.user['state'] && 
      this.user['profile'] && 
      this.user['phoneNumber'] && 
      this.user['_id']
    ) {

      let passwordUser = ((this.utilitiesService.getDateNowValueOf()).toString()).slice(-5);
      console.log('passwordUser: ', passwordUser);

      let dataObjectSend = {
        idState: this.user['state'],
        idProfile: this.user['profile'],
        firstName: this.user['firstName'],
        secondFirstName: this.user['secondFirstName'] || '',
        lastName: this.user['lastName'],
        secondLastName: this.user['secondLastName'] || '',
        idDocumentType: this.user['documentType'],
        // idCountry: '',
        // idCity: '',
        documentNumber: this.user['documentNumber'],
        email: this.user['email'],
        password: passwordUser,
        address: '',
        phoneNumber: this.user['phoneNumber'],
        birthDate: '',
        documentDateExpedition: this.utilitiesService.getDateValueOf(this.user['documentDateExpedition']),
        acceptTerms: true,
        captcha: true,
        userActiveRegister: false,
      };
      
      if (this.user['country']) {
        dataObjectSend['idCountry'] = this.user['country']['_id'];
      }
      
      if (this.user['city']) {
        dataObjectSend['idCity'] = this.user['city']['_id'];
      }

      console.log('dataObjectSend: ', dataObjectSend);
      // return false;
      this.userService.fnHttpSetEditUser(this.token, dataObjectSend, this.user['_id']).subscribe((response) => {
        console.log('response: ', response);
        if (response.status != 200) {
          this.submitted = false;
          // this.user = {};
          this.utilitiesService.showToast('top-right', 'danger', response['body']['data'], 'nb-alert');
        } else {
          this.submitted = false;
          this.user = {};
          this.utilitiesService.showToast('top-right', 'success', "Usuario registrado satisfactoriamente!", 'fas fa-check');
          // this.utilitiesService.fnRedirectPage(3000);
          this.fnReturnPage();
        }
      });
    } else {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', 'danger', 'Los datos del usuario estan incompletos!', 'nb-alert');
    }
  }

  fnReturnPage(): void {
    this.utilitiesService.fnNavigateByUrl('pages/user/list');
  }

  fnCancelUpdate(): void {
    this.fnReturnPage();
  }

}
