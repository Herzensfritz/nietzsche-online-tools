import { AppRoutingModule } from './app-routing.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { ActionComponent } from './action/action.component';
import { PageViewModule  } from './page-view/page-view.module';

@NgModule({
  declarations: [
    AppComponent,
     ActionComponent
  ],
  imports: [
     AngularDraggableModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
     PageViewModule,
     AppRoutingModule
  ],
   providers: [
      DataService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
