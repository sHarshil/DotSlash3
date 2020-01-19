import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApplicationStateService {
  public isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 1019) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
