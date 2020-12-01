import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineDirective } from './margin-field/line.directive';
import { MarginFieldComponent } from './margin-field/margin-field.component';
import { TextFieldComponent} from './textfield-component/textfield.component';
import { WordPositionDirective } from './textfield-component/word-position.directive';
import { PageViewComponent } from './page-view.component';

@NgModule({
   declarations: [
    LineDirective,
      WordPositionDirective,
      MarginFieldComponent,
      TextFieldComponent,
      PageViewComponent
   ],
   imports: [
    CommonModule
   ],
   exports: [
    MarginFieldComponent,
      TextFieldComponent,
      PageViewComponent
   ]
})
export class PageViewModule { }
