import { Component, ChangeDetectorRef } from '@angular/core';
import { ApplicationStateService } from "./services/application-state.service";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,changeDetectorRef: ChangeDetectorRef, public applicationStateService: ApplicationStateService)
  {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
}
