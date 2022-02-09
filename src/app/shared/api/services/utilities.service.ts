import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NbDialogService, NbToastrService } from '@nebular/theme';

import { HelpComponent } from '../../components/modals/help/help.component'


import { environment } from '../../../../environments/environment';
// import * as moment from 'moment';
/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
// declare var $: any;

@Injectable({ providedIn: 'root' })
export class UtilitiesService {

  private index: number = 0;
  private dataFB: any = null;
  public token: string = '';

  constructor(
    private router: Router,
    public http: HttpClient,
    private authService: NbAuthService,
    private toastrService: NbToastrService,
    private db: AngularFireDatabase,
    private dialogService: NbDialogService,
  ) {
  }

  fnGenerateKey(l: number) {
    let r = '';
    while (r.length < l) { r += Math.random().toString(16).substring(2); }
    return r.substring(0, l);
  }

  fnReturnKey() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  fnDestroySession() {
    localStorage.clear();
    sessionStorage.clear();
  }

  fnDestroySessionGoLogin() {
    localStorage.clear();
    sessionStorage.clear();
  }

  fnDestroySessionData(objectObserve) {
    localStorage.clear();
    sessionStorage.clear();
    objectObserve(true);
  }

  fnGetHost() {
    return environment.apiUrl;
  }
  
  fnGetSite() {
    // return environment.siteUrl;
  }

  fnGetUser() {
    return sessionStorage.getItem('user');
  }

  fnSetToken(token) {
    sessionStorage.setItem('token', token);
  }

  fnSetSessionStorage(nameVar, dataVal) {
    sessionStorage.setItem(nameVar, dataVal);
  }
  fnSetLocalStorage(nameVar, dataVal) {
    localStorage.setItem(nameVar, dataVal);
  }
  fnGetSessionStorage(nameVar) {
    return sessionStorage.getItem(nameVar);
  }
  async fnGetLocalStorage(nameVar) {
    return localStorage.getItem(nameVar);
  }

  fnCapitalizeText(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  fnSetStartDate(startDate) {
    localStorage.setItem('startDate', startDate);
  }
  fnSetEndDate(endDate) {
    localStorage.setItem('endDate', endDate);
  }
  fnGetToken = function () {
    const t = sessionStorage.getItem('token');
    if (t) {
      return t;
    } else {
      this.fnDestroySession();
    }
  };
  fnsetUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  fnValidSection(currentSection, currentView, itemSelectedDateBar) {

    return new Promise((responsePromise) => {

      let response = null;

      if (currentSection === currentView) {
        switch (itemSelectedDateBar) {
          case 'Today':
            response = 'Today';
            break;
          case '7Days':
            response = '7Days';
            break;
          case '30Days':
            response = '30Days';
            break;
          case 'Custom':
            response = '30Days';
            break;
        }
      } else {
        response = false;
      }

      responsePromise(response);
    });

  }

  fnSetRamdonColor() {

    const colors = [
      '#c2e8d3',
      '#bca0b9',
      '#ddadad',
      '#e9e2b3',
      '#A9BABF',
      '#B4D7D8',
      '#B5D4CD',
      '#B6CFBF',
      '#CEEBC4',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  fnMoveElemArr(arr, oi, ni) {
    while (oi < 0) { oi += arr.length; }
    while (ni < 0) { ni += arr.length; }
    if (ni >= arr.length) {
      let k = ni - arr.length;
      while ((k--) + 1) { arr.push(undefined); }
    }
    arr.splice(ni, 0, arr.splice(oi, 1)[0]);
    return arr;
  }

  fnOnlyNumber = function (e) {
    const t = e.keyCode ? e.keyCode : e.which;
    if ((t > 47 && t < 58)) {
      return true;
    } else {
      if (t === 8 || t === 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  fnSearchTextInArrayObjects(collection_objects, text_criteria, field?) {
    const results = [];
    const toSearch = text_criteria;
    collection_objects.forEach(function (obj, key) {
      Object.keys(obj).forEach(function (ooo, kkk) {
        if (field && field == ooo) {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        } else {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        }
      });
    });
    return results;
  }

  arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
  }

  filterIt(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
  }

  fnSearch(collection, data, field) {
    const arr = JSON.parse(JSON.stringify(collection));
    if (arr) {
      const search = data.toLowerCase();
      return arr.filter((obj) => {
        const datafield = { filter: obj[field].toLowerCase() };
        return Object.values(datafield).some((val) => {
          return val.includes(search);
        });
      });
    }
  }

  // fnSearchDate(collection, date_one, date_two, field) {
  //   const results = [];
  //   collection.forEach(function (obj, key) {
  //     const date_collection = moment(obj[field]).valueOf();
  //     if (date_collection >= date_one && date_collection <= date_two) {
  //       results.push(obj);
  //     }
  //   });
  //   return results;
  // }

  // fnSearchDateCallback(collection, date_one, date_two, field, callback) {
  //   const results = [];
  //   collection.forEach(function (obj, key) {
  //     const date_collection = moment(obj[field]).valueOf();
  //     if (date_collection >= date_one && date_collection <= date_two) {
  //       results.push(obj);
  //     }
  //   });
  //   callback(results);
  // }

  fnGetCurrentTokenSession(returnObserver) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a token from the token and assigne it to our `user` variable
        const current_token = token.getValue();
        if (current_token) {
          returnObserver(current_token);
        } else {
          returnObserver(false);
        }
      }
    });
  }

  fnGetDataFilter(data_collection, string_search, observer, field?) {
    const results = [];
    const self = this;
    data_collection.forEach(function (obj) {
      let search_data_flag = false;
      Object.keys(obj).forEach(function (ooo, kkk) {
        // if (typeof obj[ooo] === 'string' || obj[ooo] instanceof String) {
        if (typeof obj[ooo] === 'string' || obj[ooo] instanceof String && ooo != 'fechaCuentaCobro') {
          if (field && field === ooo && !search_data_flag) {
            if (self.removeAccents(obj[ooo].toLowerCase()).indexOf(string_search) > -1) {
              results.push(obj);
              search_data_flag = true;
            }
          } else {
            if (!search_data_flag) {
              if (self.removeAccents(obj[ooo].toLowerCase()).indexOf(string_search) > -1) {
                results.push(obj);
                search_data_flag = true;
              }
            }
          }
        }
      });
    });
    observer(results);
  }

  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  showToast(position, status, message, icon?) {
    this.index += 1;
    this.toastrService.show(status, message,
      { position, status, icon });
  }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }

  // fnSetDefineTokenAuthorization(token) {
  //   this.data_headers_request = new HttpHeaders().set('Authorization', token);
  //   return this.data_headers_request;
  // }

  // fnHttSetUploadFile(guid_user: any, fileToUpload: File, id_version: any, end_point_url: any, parameter?): Observable<any> {
  //   const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload);
  //   this.urlSetUploadFile = (parameter) ? end_point_url + '?' + parameter + '=' + id_version : end_point_url;
  //   return this.http.post(this.fnGetHost() + this.urlSetUploadFile, formData, {
  //     observe: 'response',
  //     headers: headers,
  //     reportProgress: true,
  //   });
  // }

  formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
    }
  }

  formatPercentage(value, num_decimals) {
    const value_percentage = parseFloat(value) * 100;
    const new_value_percentage = value_percentage.toFixed(num_decimals) + '%';
    return new_value_percentage;
  }



  // fnHttpTestValidEmailMock(email): Observable<any> {
  //   // const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   const urlSetDataNewCategory = '/api/Account/ValidateEmail?email=' + email;
  //   // return this.http.get('https://prozesslaw.azurewebsites.net/' + urlSetDataNewCategory,
  //   return this.http.get(this.fnGetHost() + urlSetDataNewCategory,
  //     {
  //       observe: 'response',
  //       // headers: headers,
  //       reportProgress: true,
  //     });
  // }

  // fnHttpValidEmailMock(email): Observable<any> {
  //   // const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   const urlSetDataValidEmailService = '/api/Account/ValidateEmail2';
  //   const obj_send = {
  //     'emailString': email,
  //   };
  //   // return this.http.post('https://prozesslaw.azurewebsites.net/' + urlSetDataValidEmailService, {},
  //   return this.http.post(this.fnGetHost() + urlSetDataValidEmailService, obj_send,
  //     {
  //       observe: 'response',
  //       // headers: headers,
  //       reportProgress: true,
  //     });
  // }

  // fnHttpGetEntitiesByUser(guid_user: any, user_id: number): Observable<any> {
  //   // const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
  //   const urlSetDataValidEmailService = '/api/Account/GetEmpresasUsuario';
  //   return this.http.get(this.fnGetHost() + urlSetDataValidEmailService,
  //     {
  //       observe: 'response',
  //       // headers: headers,
  //       reportProgress: true,
  //     });
  // }

  // fnHttSetUploadFileDoctors(guid_user: any, fileToUpload: File, end_point_url: any, parameter?): Observable<any> {
  //   // const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   // const formData: FormData = new FormData();
  //   // formData.append('file', fileToUpload);
  //   // formData.append('DocumentoId', '123');
  //   // formData.append('TipoArchivoId', '567');
  //   // this.urlSetUploadFile = (parameter) ? end_point_url + '?' + parameter + '=' + id_version : end_point_url;
  //   // let headers = new HttpHeaders({
  //   //   'Content-Type': 'text/csv',
  //   //  });

  //   this.headers = new HttpHeaders().set('Content-Type', 'text/csv');
  //   this.urlSetUploadFile = end_point_url;
  //   return this.http.post(this.url_host_medicos + this.urlSetUploadFile, fileToUpload, {
  //       observe: 'events',
  //       headers: this.headers,
  //       reportProgress: true,
  //     });
  // }

  fnSpliceString(string_name, char_splice) {
    const data_splice = string_name.split(char_splice);
    return data_splice;
  }

  getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
  }

  fnDecodeToken (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonToken = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonToken);
  }

  fnHttpGetDataUrlCustom(url_enpoint, guid_user?): Observable<any> {
    if (guid_user) {
      let data_headers = new HttpHeaders().set('Authorization', 'Bearer ' + guid_user);
      data_headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(url_enpoint,
        {
          observe: 'response',
          headers: data_headers,
          reportProgress: true,
        });
    } else {
      let data_headers = new HttpHeaders().set('Authorization', '');
      data_headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(url_enpoint,
        {
          observe: 'response',
          headers: data_headers,
          reportProgress: true,
        });
    }
    // this.urlGetDataUrlCustom = url_enpoint;
  }

  async fnGetDataFB(url_collection_query) {
    return new Promise(function (resolve, reject) {
      this.db.object(url_collection_query).valueChanges().subscribe((response) => {
        resolve(response);
        // this.dataFB = response;
      });
    });
  }

  fnGetDataFBCallback(url_collection_query, callback) {
    this.db.object(url_collection_query).valueChanges().subscribe((response) => {
      callback(response);
    }, (error) => {
      callback(error);
    });
  }

  fnGetDataFBPromise(url_collection_query) {
    return new Promise ((resolve, reject) => {
      this.db.object(url_collection_query).valueChanges().subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    })
  }

  fnGetBrowserLocales(options = {}) {
    const defaultOptions = {
      languageCodeOnly: false,
    };
  
    const opt = {
      ...defaultOptions,
      ...options,
    };
  
    const browserLocales =
      navigator.languages === undefined
        ? [navigator.language]
        : navigator.languages;
  
    if (!browserLocales) {
      return undefined;
    }
  
    return browserLocales.map(locale => {
      const trimmedLocale = locale.trim();
  
      return opt.languageCodeOnly
        ? trimmedLocale.split(/-|_/)[0]
        : trimmedLocale;
    });
  }

  fnStringUpperCase(text: string) {
    return text.toUpperCase();
  }

  fnAuthValidUser() {
    return new Promise((resolve, reject) => {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getValue();
          let userData = token.getPayload();
          resolve({ state: true, token: this.token, user: userData });
        } else {
          reject({state: false, token: null, user: null});
        }
      });
    })
  }

  fnSignOutUser() {
    return new Promise((resolve, reject) => {
      if (true) {
        localStorage.clear();
        sessionStorage.clear();
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  fnNavigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  fnShowModalHelp(moduleName?, columnName?, title?, description?) {
    let dataSend = {};
    dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    this.dialogService.open(HelpComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
    });
  }

  fnSortArrayByProperty(collection, field) {
    return new Promise((resolve, reject) => {
      // let OrderedCollection = collection.sort(function(a, b) {
      //   let fieldA = a[field];
      //   console.log('fieldA: ', fieldA);
      //   let fieldB = b[field];
      //   console.log('fieldB: ', fieldB);
      //   let result = fieldA - fieldB;
      //   console.log('result: ', result);
      //   return result;
      // });
      // if (OrderedCollection.length > 0) {
      //   resolve(OrderedCollection);
      // } else {
      //   reject(false);
      // }
    });
  }

  compareValues(key, order = 'ASC') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'DESC') ? (comparison * -1) : comparison
      );
    };
  }

}
