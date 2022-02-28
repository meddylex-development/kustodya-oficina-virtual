import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from 'app/shared/api/services/utilities.service';
import { MenuProfileService } from 'app/shared/api/services/menu-profile.service';
import { MenuService } from 'app/shared/api/services/menu.service';
import { ProfileService } from 'app/shared/api/services/profile.service';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public menuProfile: any = {
    'name': '',
    'description': '', 
    'idMenu': '',
  };

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'menuProfileComponent';
  public collectionMenusList: any = [];
  public collectionMenusListOriginal: any = [];
  public collectionProfileList: any = [];
  public collectionProfileListOriginal: any = [];
  
  constructor(
    protected ref: NbDialogRef<AddComponent>,
    private utilitiesService: UtilitiesService,
    private menuProfileService: MenuProfileService,
    private menuService: MenuService,
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
      this.fnGetList(this.token).then((responseMenu) => {
        console.log('responseMenu: ', responseMenu);
        if(responseMenu['body']['stateRequest']) {
          this.collectionMenusList = responseMenu['body']['data'];
          console.log('this.collectionMenusList: ', this.collectionMenusList);
          this.collectionMenusListOriginal = responseMenu['body']['data'];
        } else {
          this.collectionMenusList = []
          this.collectionMenusListOriginal = [];
        }
      });

      this.fnGetProfiles(this.token).then((response) => {
        console.log('response: ', response);
        if(response['body']['stateRequest']) {
          this.collectionProfileList = response['body']['profile'];
          console.log('this.collectionProfileList: ', this.collectionProfileList);
          this.collectionProfileListOriginal = response['body']['profile'];
        } else {
          this.collectionProfileList = []
          this.collectionProfileListOriginal = [];
        }
      })
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

  fnGetList(token) {
    return new Promise((resolve, reject) => {
      this.menuService.fnHttpGetMenuList(token).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetProfiles(token) {
    return new Promise((resolve, reject) => {
      this.profileService.fnHttpGetProfileList(token).subscribe(response => {
        const data = response['body']['profile'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSetStatusMenuProfile(data_menuProfile) {
    this.menuProfile['idMenu'] = data_menuProfile['_id'];
  }

  fnSetProfile(data_profile) {
    this.menuProfile['idProfile'] = data_profile['_id'];
  }

  fnAddData(data) {
    this.submitted = true;
    this.menuProfileService.fnHttpSetAddNewMenuProfile(this.token, this.menuProfile).subscribe(response => {
      const data = response;
      if (data['status'] == 200) {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', this.DATA_LANG['msgLblSaveSuccess']['text'], 'fas fa-check');
        this.dismiss(true);
      } else {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'danger', this.DATA_LANG['msgLblSaveError']['text'], 'nb-alert');
        this.dismiss(false);
      }
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelAddData() {
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
