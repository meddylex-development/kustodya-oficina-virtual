import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from 'app/shared/api/services/utilities.service';
@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header *ngIf="accessHeader" fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar *ngIf="accessMenu" class="menu-sidebar" tag="menu-sidebar" responsive start>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column *ngIf="accessLayout">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer *ngIf="accessFooter" fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit, OnDestroy {

  public accessHeader: boolean = false;
  public accessMenu: boolean = false;
  public accessLayout: boolean = false;
  public accessFooter: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    this.fnGetDataAccess();
  }

  fnGetDataAccess() {
    let url = 'PermissionAreas';
    this.utilitiesService.fnGetDataFBCallback(url, (response) => {
      let dataAccess = response;
      this.accessHeader = dataAccess['header']['state'];
      this.accessMenu = dataAccess['menu']['state'];
      this.accessLayout = dataAccess['layout']['state'];
      this.accessFooter = dataAccess['footer']['state'];
    });
  }

  ngOnDestroy() {

  }
  
}
