import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetCityList: string = '';
  urlGetCityListOne: string = '';
  urlSetAddNewCity: string = '';
  urlSetEditCity: string = '';
  urlSetDeleteCity: string = '';
  urlSetDeleteAllCity: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetCityList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetCityList = '/api/city/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetCityList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewCity(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewCity = '/api/city/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewCity, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditCity(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditCity = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditCity = `/api/city/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditCity, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteCity(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteCity = `/api/city/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteCity, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllCity(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllCity = `/api/city/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllCity, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  
}
