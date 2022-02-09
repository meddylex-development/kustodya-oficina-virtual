import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NbLogoutComponent, NbAuthService, NbTokenService } from '@nebular/auth';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class LogoutComponent implements OnInit {
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    protected service: NbAuthService,
    protected router: Router,
    private utilitiesService: UtilitiesService,
  ) {
    // this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = 'email';
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result) => {
      const redirect = result.getRedirect();
      if (redirect) {
        this.utilitiesService.fnDestroySessionData((resp) => {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        });
      }
    });
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }
}
