import { Component, OnInit, HostListener } from '@angular/core';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from "@angular/forms";
import { APIService } from 'src/app/services/api.service';


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

    constructor(private httpClient: HttpClient, 
        private router: Router, 
        private activatedRoute: ActivatedRoute,
        public applicationStateService: ApplicationStateService,
        public apiService: APIService) {   }

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

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

}
