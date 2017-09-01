import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from './admin.service';
@Injectable()
export class ComponentGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: AdminService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  canActivate(): boolean {

    if (this.service.loggedIn()) {
      console.log("de home al home");
      this.document.body.scrollTop = 0;
      return true;
    } else {
      console.log("de home al login");
      this.document.body.scrollTop = 0;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
