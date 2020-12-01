import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignClass, externalAssignStyle, Image, Line, Word} from './models';

@Component({
  selector: 'page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
   @Input() findText: string;
   @Input() first_image: Image;
   @Input() first_lines: Line[];
   @Input() first_words: Word[];
   @Input() second_image: Image;
   @Input() second_lines: Line[];
   @Input() second_words: Word[];
   @Input() zoomFactor: number = 1;
   @Input() max_height: number = -1;
   @Input('assignClass') assignClass: externalAssignClass;
   @Input('assignStyle') assignStyle: externalAssignStyle;

  constructor() { }

  ngOnInit() {
      if (this.max_height == -1){
         this.max_height = screen.availHeight;
      }
  }
}
