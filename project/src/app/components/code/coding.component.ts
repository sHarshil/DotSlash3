import { Component, OnInit, HostListener } from '@angular/core';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from "@angular/forms";
import { APIService } from 'src/app/services/api.service';
import { DiffEditorModel } from 'ngx-monaco-editor';


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})

export class CodingComponent implements OnInit 
{
    public isLoading: Boolean = true;
    
    public actions: {};
    public sub_actions: {};
    public languages: {};
    
    public current_action: {} = null;
    public current_sub_action: {} = null;
    public current_language: {} = null;

    constructor(private httpClient: HttpClient, 
        private router: Router, 
        private activatedRoute: ActivatedRoute,
        public applicationStateService: ApplicationStateService,
        public apiService: APIService) {   }

    setAction(event, action: {})
    {
        this.current_sub_action = null;
        this.sub_actions = null;
        
        this.languages = null;
        this.current_language = null;
        
        this.code = null;

        if (event.isUserInput)
        {
            console.log(event);
            this.current_action = action;
            this.updateSubActions();
        }
    }
    setSubAction(event, sub_action: {})
    {
        this.languages = null;
        this.current_language = null;

        this.code = null;
        
        if (event.isUserInput)
        {
            console.log(event);
            this.current_sub_action = sub_action;
            this.updateLanguages();
        }
    }

    setLanguage(event, template: {})
    {
        if (event.isUserInput)
        {
            console.log(event);
            this.current_language = template;
            this.code= this.current_language["template"];

        }
    }

    updateLanguages() {
        this.isLoading = true;

        console.log("Updating");
        console.log(this.current_sub_action);

        this.apiService.getTemplates(this.current_sub_action["_id"],
        (languages) => {
            this.isLoading = false;
            this.languages = languages;
            console.log(languages);
        },
        (error) => {
            this.isLoading = false;
            alert(error);
            console.log(error);
        }
    );

    }

    updateSubActions() {
        this.isLoading = true;
        console.log("Updating");
        console.log(this.current_action);

        this.apiService.getSubActions(this.current_action["_id"],
            (sub_actions) => {
                this.isLoading = false;
                this.sub_actions = sub_actions;
                console.log(sub_actions);
            },
            (error) => {
                this.isLoading = false;
                alert(error);
                console.log(error);
            }
        );
    
    }
    
    onActionSelect(e) {
        console.log(e);
    }
    ngOnInit() 
    {
        this.apiService.getActions(
        (actions) => {
            this.isLoading = false;
            this.actions = actions;
            console.log(actions);
        },
        (error) => {
            this.isLoading = false;
            alert(error);
            console.log(error);
        }
        );
    }
    copy()
    {
        //alert(this.code);
    }
    /*
    Coding-Area
    */
    editorOptions = { 
        theme: "vs-dark", 
        language: "javascript"
    };
  
    code: string = null;

    options = 
    {
        theme: "vs-dark"
    };


}
