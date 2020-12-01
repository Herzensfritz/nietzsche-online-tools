import { Directive, HostListener, Input } from '@angular/core';
import { Line } from '../models';
import { PageViewService } from '../page-view.service';


@Directive({
  selector: '[interactedLine]'
})
export class LineDirective {
   @Input('interactedLine') interactedLine: Line;

  constructor(private lineservice: PageViewService) { }

   @HostListener('click') onMouseClick() {
      // alert(this.word);
      this.lineservice.updateInfo(this.interactedLine);
      this.lineservice.onLineClickService(this.interactedLine);
   }

   @HostListener('mouseenter') onMouseEnter() {
     this.lineservice.mouseEnterLineService(this.interactedLine);
   }

   @HostListener('mouseleave') onMouseLeave() {
     this.lineservice.mouseLeaveLineService(this.interactedLine);
   }
}
