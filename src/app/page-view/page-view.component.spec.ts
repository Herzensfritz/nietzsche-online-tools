import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PageViewComponent } from './page-view.component';
import { PageViewModule  } from './page-view.module';

describe('PageViewComponent', () => {
  let component: PageViewComponent;
  let fixture: ComponentFixture<PageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports:[
         FormsModule,
          HttpClientTestingModule,
          PageViewModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
