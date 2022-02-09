import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetStateList: string = '';
  urlGetStateListOne: string = '';
  urlSetAddNewState: string = '';
  urlSetEditState: string = '';
  urlSetDeleteState: string = '';
  urlSetDeleteAllState: string = '';
  urlGetStateListByName: string = '';
  urlGetStateListById: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetStateList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetStateList = '/api/state/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetStateList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetStateListByName(token: string, name_state: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetStateListByName = '/api/state/list/' + name_state;
    return this.http.post(this.utility.fnGetHost() + this.urlGetStateListByName, name_state, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetStateListById(token: string, state_id: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetStateListById = '/api/state-by-id/' + state_id;
    return this.http.post(this.utility.fnGetHost() + this.urlGetStateListById, state_id, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetAddNewState(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewState = '/api/state/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewState, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditState(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditState = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditState = `/api/state/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditState, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteState(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteState = `/api/state/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteState, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllState(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllState = `/api/state/list`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllState, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
