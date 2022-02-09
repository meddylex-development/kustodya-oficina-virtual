import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetCountryList: string = '';
  urlGetCountryListOne: string = '';
  urlSetAddNewCountry: string = '';
  urlSetEditCountry: string = '';
  urlSetDeleteCountry: string = '';
  urlSetDeleteAllCountry: string = '';
  urlGetCountryListById: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetCountryList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetCountryList = '/api/country/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetCountryList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetCountryListById(token: string, id: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetCountryListById = '/api/country-by-id/' + id;
    return this.http.post(this.utility.fnGetHost() + this.urlGetCountryListById, id, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetAddNewCountry(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewCountry = '/api/country/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewCountry, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditCountry(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditCountry = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditCountry = `/api/country/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditCountry, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteCountry(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteCountry = `/api/country/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteCountry, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllCountry(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllCountry = `/api/country/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllCountry, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  
}
