import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarginFieldComponent } from './margin-field/margin-field.component';
import { TextFieldComponent} from './textfield-component/textfield.component';
import { InteractedDirective } from './interacted.directive';
import { PageViewComponent } from './page-view.component';
import { PageViewService } from './page-view.service';

@NgModule({
   declarations: [
      InteractedDirective,
      MarginFieldComponent,
      TextFieldComponent,
      PageViewComponent
   ],
   imports: [
    CommonModule
   ],
   providers: [
      PageViewService
   ],
   exports: [
      MarginFieldComponent,
      TextFieldComponent,
      PageViewComponent
   ]
})
export class PageViewModule { }
