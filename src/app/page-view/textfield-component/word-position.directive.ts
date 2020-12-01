import { Directive, HostListener, Input } from '@angular/core';
import { PageViewService } from '../page-view.service';
import { Word } from '../models';

@Directive({
   selector: '[interactedWord]'
})
export class WordPositionDirective {
   @Input('interactedWord') interactedWord: Word;

   constructor(private wordservice: PageViewService) {}

   @HostListener('click') onMouseClick() {
      // alert(this.word);
      this.wordservice.updateWordInfo(this.interactedWord);
      this.wordservice.onWordClickService(this.interactedWord);
   }
   @HostListener('mouseenter') onMouseEnter() {
     this.wordservice.mouseEnterWordService(this.interactedWord);
   }

   @HostListener('mouseleave') onMouseLeave() {
     this.wordservice.mouseLeaveWordService(this.interactedWord);
   }

}
