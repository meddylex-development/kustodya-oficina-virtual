import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


import { UtilitiesService } from 'app/shared/api/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public accessModDirectionSwitcher: boolean = false;
  public accessModThemeSelect: boolean = false;
  public accessIconToggleSidebar: boolean = false;
  public accessLogo: boolean = false;
  public accessModSearch: boolean = false;
  public accessModEmail: boolean = false;
  public accessModNotifications: boolean = false;
  public accessModPictureProfile: boolean = false;
  public urlLogo: string;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  itemsLanguages = [
    { id: 1, name: 'Español', icon: '../../../../assets/icons/flags/flag-spain.png' },
    { id: 2, name: 'English', icon: '../../../../assets/icons/flags/flag-uk.png' },
  ]

  currentTheme = 'default';

  userMenu = [ 
    { id: 1, title: 'Mi perfil', urlComponent: 'auth/sign-out' }, 
    { id: 2, title: 'Cerrar sesión', urlComponent: 'auth/sign-out' },
  ];
  // items: Observable<any[]>;
  permissions: any = null;
  language: string = '';

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    private utilitiesService: UtilitiesService,
    ) {
    }
    
    ngOnInit() {

      this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';

      this.currentTheme = this.themeService.currentTheme;
      this.fnGetDataAccess();
      this.menuService.onItemClick().subscribe((resp) => {
        let idItemMenu = resp['item']['id'];
        this.selectOptionMenu(idItemMenu);
      });

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.nick;
      });

    this.utilitiesService.fnGetLocalStorage('userData').then(resp => {
      let user = JSON.parse(resp);
      this.user = { 
        name: this.utilitiesService.fnCapitalizeText(user['firstName']) + ' ' + this.utilitiesService.fnCapitalizeText(user['lastName']), 
        picture: 'assets/images/nick.png' 
      };
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  fnGetDataAccess() {
    let urlCollection = 'PermissionAreas';
    let urlLogo = 'UrlLogo';
    // this.utilitiesService.fnGetDataFBCallback(urlLogo, (response) => {
    //   // this.urlLogo = response;
    // });

    // this.utilitiesService.fnGetDataFBPromise(urlLogo).then((response) => {
    //   console.log('response: ', response);
    // });

    const promise1 = this.utilitiesService.fnGetDataFBPromise(urlLogo);
    const promise2 = this.utilitiesService.fnGetDataFBPromise(urlCollection);

    Promise.all([promise1, promise2]).then((response) => {
      console.log('response------: ', response[0]);
      this.urlLogo = response[0].toString();
      console.log('this.urlLogo: ', this.urlLogo);
      let dataAccess = response[1];
      console.log('dataAccess: ', dataAccess);
      this.accessModDirectionSwitcher = dataAccess['modDirectionSwitcher']['state'];
      this.accessModThemeSelect = dataAccess['modThemeSelect']['state'];
      this.accessIconToggleSidebar = dataAccess['modIconToggleSidebar']['state'];
      this.accessLogo = dataAccess['modLogo']['state'];
      this.accessModSearch = dataAccess['modSearch']['state'];
      this.accessModEmail = dataAccess['modEmail']['state'];
      this.accessModNotifications = dataAccess['modNotifications']['state'];
      this.accessModPictureProfile = dataAccess['modPictureProfile']['state'];
    }).catch((error) => {
      console.log('error: ', error);
    });
    
    // this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
    //   let dataAccess = response;
    //   this.accessModDirectionSwitcher = dataAccess['modDirectionSwitcher']['state'];
    //   this.accessModThemeSelect = dataAccess['modThemeSelect']['state'];
    //   this.accessIconToggleSidebar = dataAccess['modIconToggleSidebar']['state'];
    //   this.accessLogo = dataAccess['modLogo']['state'];
    //   this.accessModSearch = dataAccess['modSearch']['state'];
    //   this.accessModEmail = dataAccess['modEmail']['state'];
    //   this.accessModNotifications = dataAccess['modNotifications']['state'];
    //   this.accessModPictureProfile = dataAccess['modPictureProfile']['state'];
    // });


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(event) {
    console.log('event: ', event);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  selectOptionMenu(idItemMenu) {
    switch (idItemMenu) {
      case 1:
        this.router.navigateByUrl('pages/my-account');
        break;
      case 2:
        this.utilitiesService.fnDestroySessionData((resp) => {
          this.ngOnDestroy();
          this.router.navigateByUrl('auth/sign-out');
        });
        break;
    }
  }
}
