import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetDocumentTypeList: string = '';
  urlGetDocumentTypeListOne: string = '';
  urlSetAddNewDocumentType: string = '';
  urlSetEditDocumentType: string = '';
  urlSetDeleteDocumentType: string = '';
  urlSetDeleteAllDocumentType: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService,
  ) { }

  fnSetDefineTokenAuthorization(token) {
    this.data_headers_request = new HttpHeaders().set('Authorization', token);
    return this.data_headers_request;
  }

  fnHttpGetDocumentTypeList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetDocumentTypeList = '/api/document-type/list';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDocumentTypeList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewDocumentType(token: string, dataObject: any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAddNewDocumentType = '/api/document-type/add';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewDocumentType, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditDocumentType(token: string, dataObject: any, id:any): Observable<any> {
    // this.urlSetEditDocumentType = 'estado/editarEstado/' + id ;
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetEditDocumentType = `/api/document-type/${id}`;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDocumentType, dataObject, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteDocumentType(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteDocumentType = `/api/document-type/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteDocumentType, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteAllDocumentType(token: string, id:any): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetDeleteAllDocumentType = `/api/document-type/${id}`;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllDocumentType, 
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
