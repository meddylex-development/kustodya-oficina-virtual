import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { UtilitiesService } from 'app/shared/api/services/utilities.service';
import { CityService } from 'app/shared/api/services/city.service';
import { StateService } from 'app/shared/api/services/state.service';
import { CountryService } from 'app/shared/api/services/country.service';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public city: any = {
    'name': '',
    'description': '', 
    'idState': '',
  };

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'cityComponent';
  public collectionStatesList: any = [];
  public collectionStatesListOriginal: any = [];
  public collectioncountryList: any = [];
  public collectioncountryListOriginal: any = [];
  
  constructor(
    protected ref: NbDialogRef<EditComponent>,
    private utilitiesService: UtilitiesService,
    private cityService: CityService,
    private stateService: StateService, 
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // this.language = 'EN';
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataGeneralLanguages(this.language);
    this.utilitiesService.fnAuthValidUser().then(response => {
      this.token = response['token'];
      this.userData = response['user'];
      this.city = JSON.parse(JSON.stringify(this.data));

      this.fnGetList(this.token).then((responseState) => {
        if(responseState['body']['stateRequest']) {
          this.collectionStatesList = responseState['body']['state'];
          this.collectionStatesListOriginal = responseState['body']['state'];

          let idState = this.data['idState'];
          if (idState) {
            this.fnGetStates(this.token, idState).then((response) => {
              if (response) {
                this.city['state'] =  response['body']['state'][0];
              }
            });
          }

        } else {
          this.collectionStatesList = []
          this.collectionStatesListOriginal = [];
        }
      });

      this.fnGetCountries(this.token).then((response) => {
        console.log('response: ', response);
        if(response['body']['stateRequest']) {
          this.collectioncountryList = response['body']['data'];
          this.collectioncountryListOriginal = response['body']['data'];

          let idCountry = this.data['idCountry'];
          if (idCountry) {
            this.fnGetCountryById(this.token, idCountry).then((response) => {
              if (response) {
                console.log('response: ', response);
                this.city['country'] =  response['body']['data'][0];
                console.log('this.city["country"]: ', this.city['country']);
              }
            });
          }

        } else {
          this.collectioncountryList = []
          this.collectioncountryListOriginal = [];
        }
      })

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      })
    });
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

  fnGetStates(token, idState) {
    return new Promise((resolve, reject) => {
      this.stateService.fnHttpGetStateListById(token, idState).subscribe(response => {
        const data = response['body']['state'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetCountryById(token, idCountry) {
    return new Promise((resolve, reject) => {
      this.countryService.fnHttpGetCountryListById(token, idCountry).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetList(token) {
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

  
  fnGetCountries(token) {
    return new Promise((resolve, reject) => {
      this.countryService.fnHttpGetCountryList(token).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSetStatusCity(data_city) {
    this.city['idState'] = data_city['_id'];
  }

  fnSetCountry(data_country) {
    this.city['idCountry'] = data_country['_id'];
  }

  fnEditData(data) {
    this.submitted = true;
    this.cityService.fnHttpSetEditCity(this.token, this.city, this.city['_id']).subscribe(response => {
      const data = response;
      if (data['status'] == 200) {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', this.DATA_LANG['msgLblUpdateSuccess']['text'], 'nb-alert');
        this.dismiss(true);
      } else {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'danger', this.DATA_LANG['msgLblDeleteError']['text'], 'nb-alert');
        this.dismiss(false);
      }
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelAddData() {
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}