import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginComponentComponent } from './margin-component.component';

describe('MarginComponentComponent', () => {
  let component: MarginComponentComponent;
  let fixture: ComponentFixture<MarginComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarginComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
