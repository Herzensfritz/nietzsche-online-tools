import { Component, Input, OnInit } from '@angular/core';
import {Line, TextField, Word} from '../models/models';
import { PageViewService } from '../services/field-interaction.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'margin-field',
  templateUrl: './margin-field.component.html',
  styleUrls: ['./margin-field.component.css']
})
export class MarginFieldComponent implements OnInit {
   hoveredLine?: Line;
   hoveredWord?: Word;
   @Input() lines: Line[];
   line_height: number = 8;
   line_length: number = 10;
   line_x: number = 5;
   margin_height: number = 973.91998;
   margin_width: number = 30;
   @Input() text_field: TextField;
   viewBox: string = '';
   @Input() zoomFactor: number = 2;

   constructor( private lineservice: PageViewService) { }

  ngOnInit() {
      if (this.text_field != null) {
         this.margin_height = this.text_field.height;
      } 
      this.viewBox = 0 + ' ' +  0 + ' ' + this.margin_width + ' ' + this.margin_height;

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

  private highlight(line: Line){
     return (typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null && line === this.hoveredLine) // if line is hovered
        || (typeof this.hoveredWord !== 'undefined' && this.hoveredWord !== null && line.id == this.hoveredWord.line) // if a word on line is hovered
  }

}
