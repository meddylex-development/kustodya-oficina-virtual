import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetProfileList: string = '';
  urlGetProfileListOne: string = '';
  urlSetAddNewProfile: string = '';
  urlSetEditProfile: string = '';
  urlSetDeleteProfile: string = '';
  urlSetDeleteAllProfile: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetProfileList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetProfileList = '/api/profile/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetProfileList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewProfile(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewProfile = '/api/profile/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewProfile, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditProfile(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditProfile = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditProfile = `/api/profile/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditProfile, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteProfile(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteProfile = `/api/profile/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteProfile, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllProfile(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllProfile = `/api/profile/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllProfile, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
