import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuProfileService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetMenuProfileList: string = '';
  urlGetMenuProfileListOne: string = '';
  urlSetAddNewMenuProfile: string = '';
  urlSetEditMenuProfile: string = '';
  urlSetDeleteMenuProfile: string = '';
  urlSetDeleteAllMenuProfile: string = '';
  urlGetMenuProfileListByProfileId: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetMenuProfileList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetMenuProfileList = '/api/menu-profile/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetMenuProfileList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetMenuProfileListByProfileId(token: string, idProfile): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetMenuProfileListByProfileId =  `/api/menu-profile-by-profile-id/${idProfile}`;
    return this.http.get(this.utility.fnGetHost() + this.urlGetMenuProfileListByProfileId, 
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewMenuProfile(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewMenuProfile = '/api/menu-profile/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewMenuProfile, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditMenuProfile(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditMenuProfile = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditMenuProfile = `/api/menu-profile/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditMenuProfile, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteMenuProfile(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteMenuProfile = `/api/menu-profile/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteMenuProfile, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllMenuProfile(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllMenuProfile = `/api/menu-profile/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllMenuProfile, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
