import { Component, OnInit } from '@angular/core';
import { NbIconLibraries, NbMenuItem } from '@nebular/theme';
import { MenuProfileService } from 'app/shared/api/services/menu-profile.service';
import { MenuService } from 'app/shared/api/services/menu.service';
import { UtilitiesService } from 'app/shared/api/services/utilities.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  public token: string = '';
  public userData: any = null;
  public menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: { icon: 'tachometer-alt' , pack: 'fas' },
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: 'Mi perfil',
      icon: { icon: 'address-book' , pack: 'fas' },
      link: '/pages/my-profile',
      home: false,
    },
    {
      title: 'FEATURES',
      group: true,
    },
  ];
  // public menu = MENU_ITEMS;
  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'menuComponent';

  constructor(
    private iconLibraries: NbIconLibraries,
    private menuService: MenuService,
    private menuProfileService: MenuProfileService,
    private utilitiesService: UtilitiesService,
  ) { 
  }
  
  ngOnInit(): void {

    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // this.language = 'EN';
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataGeneralLanguages(this.language);

    this.utilitiesService.fnAuthValidUser().then(response => {
      this.token = response['token'];
      this.userData = response['user'];
      this.utilitiesService.fnGetLocalStorage('userData').then(respUserData => {
        let user = JSON.parse(respUserData);
        // this.user = { 
        //   name: this.utilitiesService.fnCapitalizeText(user['firstName']) + ' ' + this.utilitiesService.fnCapitalizeText(user['lastName']), 
        //   picture: 'assets/images/nick.png' 
        // };
        this.fnGetListByIdProfile(this.token, user['idProfile']).then(resp => {
          if (!resp['body']['stateRequest']) {
            
          } else {
  
            let dataMenu = resp['body']['data'] || [];
            dataMenu.forEach(element => {
              this.fnGetListById(this.token, element['idMenu']).then((respData) => {
                let itemMenu = respData['body']['data'] || null;
                if (!itemMenu) {
                  
                } else {
                  this.menu.push({
                    title: itemMenu[0].title,
                    icon: { icon: itemMenu[0].icon , pack: 'fas' },
                    link: itemMenu[0].link,
                  });
                }
              }).catch((err) => {
              });
            });
          }
        }).catch((err) => {
        });
      });

      // this.fnGetList(this.token).then(resp => {
      //   if (!resp['body']['stateRequest']) {
          
      //   } else {

      //     let dataMenu = resp['body']['data'] || [];
      //     dataMenu.forEach(element => {
      //       this.menu.push({
      //         title: element.title,
      //         icon: { icon: element.icon , pack: 'fas' },
      //         link: element.link,
      //       });
      //     });
      //   }
      // });

      this.iconLibraries.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa' }); 
      this.iconLibraries.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa' }); 
      this.iconLibraries.registerFontPack('fad', { packClass: 'fad', iconClassPrefix: 'fa' }); 
      this.iconLibraries.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' }); 
      this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' }); 

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      })
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

  fnGetListById(token, idMenu) {
    return new Promise((resolve, reject) => {
      this.menuService.fnHttpGetMenuListById(token, idMenu).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetListByIdProfile(token, idProfile) {
    return new Promise((resolve, reject) => {
      this.menuProfileService.fnHttpGetMenuProfileListByProfileId(token, idProfile).subscribe(response => {
        const data = response['body']['data'];
        if (data.length > 0) {
          resolve(response);
        } else {
          reject(false);
        }
      });
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

}
