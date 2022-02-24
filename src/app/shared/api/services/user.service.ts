import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetUserList: string = '';
  urlGetUserListOne: string = '';
  urlSetAddNewUser: string = '';
  urlSetAddNewUserAuth: string = '';
  urlSetEditUser: string = '';
  urlSetDeleteUser: string = '';
  urlSetDeleteAllUser: string = '';
  urlSetActivateUser: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetUserList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetUserList = '/api/user/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetUserList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewUser(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewUser = '/api/user/sign-up';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewUser, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetAddNewUserAuth(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewUserAuth = '/api/user/sign-up-auth';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewUserAuth, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditUser(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditUser = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditUser = `/api/user/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditUser, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteUser(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteUser = `/api/user/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteUser, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllUser(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllUser = `/api/user/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllUser, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  
  fnHttpSetActivateUser(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetActivateUser = `/api/user/activate-user/${token}`;
    return this.http.get(this.utility.fnGetHost() + this.urlSetActivateUser, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
