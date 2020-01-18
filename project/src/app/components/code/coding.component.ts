import { Component, OnInit, HostListener } from '@angular/core';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})

export class CodingComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,public applicationStateService: ApplicationStateService) {   }

  ngOnInit() 
  {

  }
}