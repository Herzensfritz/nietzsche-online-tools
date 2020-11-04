import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { LineDirective } from './margin-field/line.directive';
import { MarginFieldComponent } from './margin-field/margin-field.component';
import { TextFieldComponent} from './textfield-component/textfield.component';
import { WordPositionDirective } from './textfield-component/word-position.directive';
import { ActionComponent } from './action/action.component';

@NgModule({
  declarations: [
    AppComponent,
     TextFieldComponent,
     WordPositionDirective,
     MarginFieldComponent,
     LineDirective,
     ActionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
   providers: [
      DataService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
