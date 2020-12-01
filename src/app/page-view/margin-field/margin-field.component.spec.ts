import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MarginFieldComponent } from './margin-field.component';

describe('MarginFieldComponent', () => {
  let component: MarginFieldComponent;
  let fixture: ComponentFixture<MarginFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ FormsModule ],
      declarations: [ MarginFieldComponent ]
    })
    .compileComponents();
  }));

   /*beforeEach(() => {
    fixture = TestBed.createComponent(MarginFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
