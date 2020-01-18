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

    public makeTemplate(sub_action_id, language, template,  success, failure): void 
    {
        var data = {
            "langage" : language,
            "template": template
        };
        
        this.httpClient
          .post(environment.backend_url + "/templates/" + sub_action_id, data, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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

    public deleteTemplate(_id, success, failure): void 
    {
        this.httpClient
          .delete(environment.backend_url + "/template/"+_id, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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
    
    public editTemplate(_id: string, language, template, success: (resp: any) => void, failure: (err: any) => void) {
        
        var data = {
            "language" : language,
            "template": template
        };

        this.httpClient
        .put(environment.backend_url + "/template/" + _id, data , 
        {
          responseType: "text",
          headers: { "Content-Type": "application/json; charset=utf-8" }
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

    public makeSubAction(action_id, name, success, failure): void 
    {
        var data = {
            "name": name
        };
        this.httpClient
          .post(environment.backend_url + "/action/" + action_id, data, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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

    public makeAction(action_name, success, failure): void 
    {
        var data = {
            "name": action_name
        };
        this.httpClient
          .post(environment.backend_url + "/actions", data, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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

    public deleteAction(_id, success, failure): void 
    {
        this.httpClient
          .delete(environment.backend_url + "/action/"+_id, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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
    
    public editAction(_id: string, name: string, success: (resp: any) => void, failure: (err: any) => void) {
        this.httpClient
        .put(environment.backend_url + "/action/" + _id, {"name" : name} , 
        {
          responseType: "text",
          headers: { "Content-Type": "application/json; charset=utf-8" }
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

    public deleteSubAction(_id, success, failure): void 
    {
        this.httpClient
          .delete(environment.backend_url + "/subaction/"+_id, {
            responseType: "text",
            headers: { "Content-Type": "application/json; charset=utf-8" }
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
    
    editSubAction(_id: string, name: string, success: (resp: any) => void, failure: (err: any) => void) {
        this.httpClient
        .put(environment.backend_url + "/subaction/" + _id, {"name" : name} , 
        {
          responseType: "text",
          headers: { "Content-Type": "application/json; charset=utf-8" }
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