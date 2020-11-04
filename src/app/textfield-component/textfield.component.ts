import { Component, Input, OnInit } from '@angular/core';
import {Image, Line, Word} from '../models/models';
import { PageViewService } from '../services/field-interaction.service';
import {Subscription} from 'rxjs';

@Component({
   selector: 'text-field',
   templateUrl: './textfield.component.html',
   styleUrls: ['./textfield.component.css']
})
/**
 * Textfield component
 */
export class TextFieldComponent implements OnInit {
   clickedWord?: Word;
   @Input() findText: string;
   hoveredLine?: Line;
   @Input() image: Image;
   image_height: number = 400;
   image_left: number = 0;
   imageSpec = { x: 0, y: 0, height: 973.91998, width: 2038.5601 };
   image_width: number = 300;
   image_top: number = 0;
   viewBox: string = '';
   @Input() words: Word[];
   @Input() zoomFactor: number = 2;

   constructor( private wordservice: PageViewService) { }

   ngOnInit() {
      if (this.image.text_field != null) {
         this.image_left = this.image.text_field.left;
         this.image_top = this.image.text_field.top;
         this.image_width = this.image.text_field.width;
         this.image_height = this.image.text_field.height;
         this.imageSpec.x = this.image.text_field.left;
         this.imageSpec.y = this.image.text_field.top;
         this.imageSpec.height = this.image.height;
         this.imageSpec.width = this.image.width;
      } else if (this.imageSpec != null) {
         this.image_width = this.imageSpec.width;
         this.image_height = this.imageSpec.height;
      }
      this.viewBox = this.image_left + ' ' +  this.image_top + ' ' + this.image_width + ' ' + this.image_height;

      this.wordservice.onClickedWord.subscribe(
       (changedWord: Word ) => this.clickedWord = changedWord
      );

      this.wordservice.onHoveredLine.subscribe(
         (changedLine: Line) => { this.hoveredLine = changedLine;}
      );

     this.wordservice.offHoveredLine.subscribe(
       (changedLine: Line) => { this.hoveredLine = null; }
     );


   }
   private asignClass(word: Word) {
      if (this.findText != null && this.findText != ''){
         return (word.text.match(this.findText) 
                || (word.edited_text != null && word.edited_text.match(this.findText))
         ) ? { 'textfield search_found': true } : { 'textfield unhighlighted': true }
      }
      if (!(typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null)) {
         if (word.deleted){
            return { 'text_field deleted': true };
         } else {
            return (word.id % 2 == 0) ? { 'textfield even_highlight': true } : {'textfield uneven_highlight': true}
         }
      } else {
         return (this.hoveredLine.id == word.line) ?  { 'textfield howered_line': true } : { 'textfield unhighlighted': true }
      } 
  }

}
