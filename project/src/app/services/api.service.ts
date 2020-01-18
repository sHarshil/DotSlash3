import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
  })
export class APIService {
    constructor(
        private router: Router,
        private httpClient: HttpClient
      )
    {
      
    }   
    public getActions(success, failure): void 
    {
        this.httpClient
          .get(environment.backend_url + "/actions", {
            responseType: "text",
          })
          .subscribe(
            res => {
              const response = JSON.parse(res);
              console.log(response);
              success(response);
            },
            err => {
              console.log(err);
              failure(err);
            }
          );
    }
    public getSubActions(action_id, success, failure): void 
    {
        this.httpClient
          .get(environment.backend_url + "/action/" + action_id, {
            responseType: "text",
          })
          .subscribe(
            res => {
              const response = JSON.parse(res);
              console.log(response);
              success(response);
            },
            err => {
              console.log(err);
              failure(err);
            }
          );
    }
    public getTemplates(sub_action_id, success, failure): void 
    {
        this.httpClient
          .get(environment.backend_url + "/templates/" + sub_action_id, {
            responseType: "text",
          })
          .subscribe(
            res => {
              const response = JSON.parse(res);
              console.log(response);
              success(response);
            },
            err => {
              console.log(err);
              failure(err);
            }
          );
    }


}