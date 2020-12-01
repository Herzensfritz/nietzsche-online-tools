import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignStyle, Line, TextField, Word} from '../models';
import { PageViewService } from '../page-view.service';
import { HIGHTLIGHT_CASES } from '../highlight_status';

@Component({
  selector: 'margin-field',
  templateUrl: './margin-field.component.html',
  styleUrls: ['./margin-field.component.css']
})
export class MarginFieldComponent implements OnInit, OnChanges {
   hoveredLine?: Line;
   hoveredWord?: Word;
   @Input() lines: Line[];
   line_height: number = 8;
   line_length: number = 10;
   line_x: number = 5;
   margin_height: number = 973.91998;
   margin_top: number = 0;
   margin_width: number = 30;
   @Input() text_field: TextField;
   viewBox: string = '';
   @Input() max_height: number = -1;
   @Input() zoomFactor: number = 1;
   @Input('assignStyle') assignStyle: externalAssignStyle = (line: Line, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object =>{ return {} };
   identification_key: string = 'iri';
   local_zoom: number = 1;

   constructor( private lineservice: PageViewService) { }

  ngOnInit() {
      if (this.max_height == -1){
         this.max_height = screen.availHeight;
      }
      this.viewBox = 0 + ' ' +  this.margin_top + ' ' + this.margin_width + ' ' + this.margin_height;
      if (this.lines.length > 0 && this.lines[0]['iri'] === undefined){
         this.identification_key = 'id'; 
      }
      if (this.text_field != null) {
         this.updateViewBox()
      } 
      this.lineservice.onHoveredLine.subscribe(
         (changedLine: Line) => { this.hoveredLine = changedLine;}
      );
      this.lineservice.offHoveredLine.subscribe(
       (changedLine: Line) => { this.hoveredLine = null; }
      );
      this.lineservice.onHoveredWord.subscribe(
         (changedWord: Word) => { this.hoveredWord = changedWord;}
      );
      this.lineservice.offHoveredWord.subscribe(
       (changedWord: Word) => { this.hoveredWord = null; }
      );
  }
  ngOnChanges(changes: SimpleChanges) {
      if (this.text_field != null) {
         this.updateViewBox()
      } 
  }
  private updateViewBox(){
     this.margin_height = this.text_field.height;
     this.local_zoom = this.max_height/this.text_field.height;
     this.margin_top = this.text_field.top;
     this.viewBox = 0 + ' ' +  this.margin_top + ' ' + this.margin_width + ' ' + this.margin_height;
  }
  private getHoverStatus(line: Line): string {
     if ( (typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null && line === this.hoveredLine) 
     || (typeof this.hoveredWord !== 'undefined' && this.hoveredWord !== null && line[this.identification_key] == this.hoveredWord.line))  {
         return HIGHTLIGHT_CASES.LINE_HOVERED; 
     } else {
         return HIGHTLIGHT_CASES.DEFAULT; 
     }
  }
  private highlight(line: Line){
     return this.getHoverStatus(line) == HIGHTLIGHT_CASES.LINE_HOVERED;
  }
}
