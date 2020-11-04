import { Directive, HostListener, Input } from '@angular/core';
import { Line } from '../models/models';
import { PageViewService } from '../services/field-interaction.service';


@Directive({
  selector: '[interactedLine]'
})
export class LineDirective {
   @Input('interactedLine') interactedLine: Line;

  constructor(private lineservice: PageViewService) { }

   @HostListener('click') onMouseClick() {
      // alert(this.word);
      this.lineservice.updateInfo(this.interactedLine);
      this.lineservice.onClickService(this.interactedLine);
   }

   @HostListener('mouseenter') onMouseEnter() {
     this.lineservice.mouseEnterService(this.interactedLine);
   }

   @HostListener('mouseleave') onMouseLeave() {
     this.lineservice.mouseLeaveService(this.interactedLine);
   }
}
