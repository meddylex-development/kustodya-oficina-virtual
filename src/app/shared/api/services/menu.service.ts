import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetMenuList: string = '';
  urlGetMenuListOne: string = '';
  urlSetAddNewMenu: string = '';
  urlSetEditMenu: string = '';
  urlSetDeleteMenu: string = '';
  urlSetDeleteAllMenu: string = '';
  urlGetMenuListById: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetMenuList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetMenuList = '/api/menu/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetMenuList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetMenuListById(token: string, id: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetMenuListById = '/api/menu-by-id/' + id;
    return this.http.post(this.utility.fnGetHost() + this.urlGetMenuListById, id, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetAddNewMenu(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewMenu = '/api/menu/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewMenu, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditMenu(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditMenu = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditMenu = `/api/menu/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditMenu, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteMenu(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteMenu = `/api/menu/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteMenu, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllMenu(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllMenu = `/api/menu/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllMenu, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
