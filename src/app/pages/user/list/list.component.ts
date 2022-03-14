import { Component, OnInit } from '@angular/core';
import { 
  NbDialogService, 
} from '@nebular/theme';

import { UtilitiesService } from 'app/shared/api/services/utilities.service';

import { AddComponent } from '../add/add.component';
import { DeleteAllComponent } from '../delete-all/delete-all.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { UserService } from 'app/shared/api/services/user.service';
import { StateService } from 'app/shared/api/services/state.service';
import { ProfileService } from 'app/shared/api/services/profile.service';

@Component({
  selector: 'list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public token: string = '';
  public userData: any = null;
  public currentPage: Number = 1;
  public itemsPerPage: Number = 5;
  public collectionData: any = [
    // { 'id': 1, 'name': 'Activo', 'description': 'Estado activo', 'dateCreated': 1633624131429, 'dateUpdated': 1633624131429 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
  ];
  public collectionOriginalData: any = null;
  public typeSort: any = [
    { id:1, state: 'DEFAULT', column: 'name' },
    { id:2, state: 'DEFAULT', column: 'description' },
    { id:3, state: 'DEFAULT', column: 'state' },
    { id:4, state: 'DEFAULT', column: 'dateCreated' },
    { id:5, state: 'DEFAULT', column: 'dateUpdated' },
  ];

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'userComponent';

  constructor(
    private dialogService: NbDialogService,
    private utilitiesService: UtilitiesService,
    private userService: UserService,
    private stateService: StateService,
    private profileService: ProfileService,
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
      this.fnBuildDataPromises(this.token);
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

  fnBuildDataPromises(token) {
    this.fnGetList(token).then((response) => {
      if (response) {
        const data = response['body']['user'];
        let collectionData = JSON.parse(JSON.stringify(data));
        collectionData.forEach((value, key) => {
          let idState = value['idState'];
          let idProfile = value['idProfile'];
          if (idState) {
            this.fnGetStates(token, idState).then((responseState) => {
              if (responseState) {
                value['stateName'] = responseState['body']['state'][0]['name'];
              }
            });
          }
          if (idProfile) {
            this.fnGetProfileById(token, idProfile).then((responseProfile) => {
              console.log('responseProfile: ', responseProfile);
              if (responseProfile) {
                value['profileName'] = responseProfile['body']['data'][0]['name'];
                console.log('value["profileName"]: ', value['profileName']);
              }
            });
          }
        });
        this.collectionData = collectionData;
        this.collectionOriginalData = collectionData;
      } else {
        this.collectionOriginalData = [];
        this.collectionData = [];
      }
    })
  }

  fnGetList(token) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetUserList(token).subscribe(response => {
        const data = response['body']['user'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetProfileById(token, id_profile) {
    return new Promise((resolve, reject) => {
      this.profileService.fnHttpGetProfileListById(token, id_profile).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
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

  showModalAdd(data) {
    let dataSend = {};
    dataSend['data'] = data;
    console.log('dataSend: ', dataSend);
    // this.dialogService.open(AddComponent, { context: dataSend }).onClose.subscribe((res) => {
    //   this.fnBuildDataPromises(this.token);
    // });
    this.utilitiesService.fnNavigateByUrl('pages/user/add-user');
  }

  showModalEdit(data) {
    // let dataSend = {};
    // dataSend['data'] = data;
    // this.dialogService.open(EditComponent, { context: dataSend }).onClose.subscribe((res) => {
    //   this.fnBuildDataPromises(this.token);
    // });

    this.utilitiesService.fnSetDataShare({ 
      dataUser: data,
    });

    this.utilitiesService.fnNavigateByUrl('pages/user/edit-user');
  }

  showModalDelete(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnBuildDataPromises(this.token);
    });
  }

  showModalDeleteAll(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteAllComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnBuildDataPromises(this.token);
    });
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
  }

  fnOrderList(columnName, collectionData, typeSort, index) {

    this.typeSort.forEach((element, key) => {
      if(key != index) {
        element['state'] = 'DEFAULT';
      }
    });

    switch (typeSort[index]['state']) {
      case 'DEFAULT':
        this.typeSort[index]['state'] = 'ASC';
        this.collectionData = collectionData.sort(this.utilitiesService.compareValues(columnName, this.typeSort[index]['state']));
        break;
      case 'ASC':
        this.typeSort[index]['state'] = 'DESC';
        this.collectionData = collectionData.sort(this.utilitiesService.compareValues(columnName, this.typeSort[index]['state']));
        break;
      case 'DESC':
        this.typeSort[index]['state'] = 'DEFAULT';
        let dataTest = JSON.parse(JSON.stringify(this.collectionOriginalData));
        this.collectionData = dataTest;
        break;
    }
  }

}
