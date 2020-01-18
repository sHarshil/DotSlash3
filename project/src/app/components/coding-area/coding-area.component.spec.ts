import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingAreaComponent } from './coding-area.component';

describe('CodingAreaComponent', () => {
  let component: CodingAreaComponent;
  let fixture: ComponentFixture<CodingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
