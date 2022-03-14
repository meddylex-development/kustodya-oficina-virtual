import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from 'app/shared/api/services/utilities.service';

@Component({
  selector: 'list-transcription',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public token: string = '';
  public userData: any = null;
  public flipped: boolean = false;
  public submitted: boolean = false;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public typeSort: any = [
    { id:1, state: 'DEFAULT', column: 'name' },
    { id:2, state: 'DEFAULT', column: 'description' },
    { id:3, state: 'DEFAULT', column: 'state' },
    { id:4, state: 'DEFAULT', column: 'dateCreated' },
    { id:5, state: 'DEFAULT', column: 'dateUpdated' },
  ];
  public collectionData: any = [];
  public dataCollection: any = [{
    "iIDDiagnosticoIncapacidad":11131,
    "iIDPaciente":2,
    "uiCodigoDiagnostico":"511e490b-11a9-4370-a347-246e6e65fa53",
    "dtFechaEmisionIncapacidad":"2022-01-20T01:54:09.597",
    "dtFechaCreacion":"2022-01-20T01:54:09.597",
    "dtFechaFin":"2022-02-10T22:54:07",
    "tCIE10":"A065",
    "tDescripcion":"Absceso amebiano del pulmón",
    "iDiasIncapacidad":22,
    "iDiasAcumuladosPorroga":1788,
    "tDescripcionSintomatologica":"El paciente sufre un trauma severo que le provoca una fuerte afeccion que implica alguno organos internos y externos",
    "bProrroga":true,
    "valor":916667.00,
    "maxestado":1,
    "estado": "Radicado"
  }, {
    "iIDDiagnosticoIncapacidad":11130,
    "iIDPaciente":2,
    "uiCodigoDiagnostico":"41789d7a-50e6-4619-9077-4c67e04bec4e",
    "dtFechaEmisionIncapacidad":"2022-01-12T16:35:32.703",
    "dtFechaCreacion":"2022-01-12T16:35:32.703",
    "dtFechaFin":"2022-01-31T13:35:42",
    "tCIE10":"A065",
    "tDescripcion":"Absceso amebiano del pulmón",
    "iDiasIncapacidad":19,
    "iDiasAcumuladosPorroga":1769,
    "tDescripcionSintomatologica":"dgfdgfhdgfhdgfhgdfdgfhdgfhdgfhdfghdgfhdgf",
    "bProrroga":true,
    "valor":791667.00,
    "maxestado":6,
    "estado": "Por pagar"
  }];

  public collectionOriginalData: any = null;
  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'userComponent';

  constructor(
    private dialogService: NbDialogService,
    private utilitiesService: UtilitiesService,
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
      console.log('this.userData: ', this.userData);
      // this.fnBuildDataPromises(this.token);
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

  // fnBuildDataPromises(token) {
  //   this.fnGetList(token).then((response) => {
  //     if (response) {
  //       const data = response['body']['user'];
  //       let collectionData = JSON.parse(JSON.stringify(data));
  //       collectionData.forEach((value, key) => {
  //         let idState = value['idState'];
  //         let idProfile = value['idProfile'];
  //         if (idState) {
  //           this.fnGetStates(token, idState).then((responseState) => {
  //             if (responseState) {
  //               value['stateName'] = responseState['body']['state'][0]['name'];
  //             }
  //           });
  //         }
  //         if (idProfile) {
  //           this.fnGetProfileById(token, idProfile).then((responseProfile) => {
  //             console.log('responseProfile: ', responseProfile);
  //             if (responseProfile) {
  //               value['profileName'] = responseProfile['body']['data'][0]['name'];
  //               console.log('value["profileName"]: ', value['profileName']);
  //             }
  //           });
  //         }
  //       });
  //       this.collectionData = collectionData;
  //       this.collectionOriginalData = collectionData;
  //     } else {
  //       this.collectionOriginalData = [];
  //       this.collectionData = [];
  //     }
  //   })
  // }

  // fnGetList(token) {
  //   return new Promise((resolve, reject) => {
  //     this.userService.fnHttpGetUserList(token).subscribe(response => {
  //       const data = response['body']['user'];
  //       if (data.length > 0) {
  //         resolve(response);
  //       } else {
  //         reject(false);
  //       }
  //     });
  //   });
  // }

  // fnGetProfileById(token, id_profile) {
  //   return new Promise((resolve, reject) => {
  //     this.profileService.fnHttpGetProfileListById(token, id_profile).subscribe(response => {
  //       const data = response['body']['data'];
  //       if (data.length > 0) {
  //         resolve(response);
  //       } else {
  //         reject(false);
  //       }
  //     });
  //   });
  // }

  // fnGetStates(token, idState) {
  //   return new Promise((resolve, reject) => {
  //     this.stateService.fnHttpGetStateListById(token, idState).subscribe(response => {
  //       const data = response['body']['state'];
  //       if (data.length > 0) {
  //         resolve(response);
  //       } else {
  //         reject(false);
  //       }
  //     });
  //   });
  // }

  fnGoToAddNewTranscription(data) {
    let dataSend = {};
    dataSend['data'] = data;
    console.log('dataSend: ', dataSend);
    // this.dialogService.open(AddComponent, { context: dataSend }).onClose.subscribe((res) => {
    //   this.fnBuildDataPromises(this.token);
    // });
    this.utilitiesService.fnSetDataShare({ 
      dataUser: data,
    });
    this.utilitiesService.fnNavigateByUrl('pages/transcripcion/transcribir-incapacidad');
  }

  // showModalEdit(data) {
  //   // let dataSend = {};
  //   // dataSend['data'] = data;
  //   // this.dialogService.open(EditComponent, { context: dataSend }).onClose.subscribe((res) => {
  //   //   this.fnBuildDataPromises(this.token);
  //   // });

  //   this.utilitiesService.fnSetDataShare({ 
  //     dataUser: data,
  //   });

  //   this.utilitiesService.fnNavigateByUrl('pages/user/edit-user');
  // }

  // showModalDelete(data) {
  //   let dataSend = {};
  //   dataSend['data'] = data;
  //   this.dialogService.open(DeleteComponent, { context: dataSend }).onClose.subscribe((res) => {
  //     this.fnBuildDataPromises(this.token);
  //   });
  // }

  // showModalDeleteAll(data) {
  //   let dataSend = {};
  //   dataSend['data'] = data;
  //   this.dialogService.open(DeleteAllComponent, { context: dataSend }).onClose.subscribe((res) => {
  //     this.fnBuildDataPromises(this.token);
  //   });
  // }

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
