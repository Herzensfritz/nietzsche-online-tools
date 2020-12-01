import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignClass, externalAssignStyle, Image, Line, Word} from '../models';
import { PageViewService } from '../page-view.service';
import { HIGHTLIGHT_CASES } from '../highlight_status';


@Component({
   selector: 'text-field',
   templateUrl: './textfield.component.html',
   styleUrls: ['./textfield.component.css']
})
/**
 * Textfield component
 */
export class TextFieldComponent implements OnInit, OnChanges {
   clickedWord?: Word;
   @Input() findText: string;
   hoveredLine?: Line;
   hoveredWord?: Word;
   @Input() image: Image;
   image_height: number = 400;
   imageSpec = { x: 0, y: 0, height: 973.91998, width: 2038.5601 };
   image_width: number = 300;
   viewBox: string = '';
   @Input() max_height: number = -1;
   @Input() words: Word[];
   @Input() zoomFactor: number = 1;
   local_zoom: number = 1;
   identification_key: string = 'iri';
   @Input('assignClass') externalAssignClassAfter: externalAssignClass;
   @Input('assignStyle') assignStyle: externalAssignStyle = (word: Word, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object =>{ return {} };

   constructor( private wordservice: PageViewService) { }

   ngOnInit() {
      if (this.max_height == -1){
         this.max_height = screen.availHeight;
      }
      if (this.image.text_field != null) {
         this.updateImageProperties();
      } else if (this.imageSpec != null) {
         this.image_width = this.imageSpec.width;
         this.image_height = this.imageSpec.height;
         this.viewBox = '0 0 ' + this.image_width + ' ' + this.image_height;
      }
      if (this.words.length > 0 && this.words[0]['iri'] === undefined){
         this.identification_key = 'id'; 
      }
      this.wordservice.onClickedWord.subscribe(
       (changedWord: Word ) => this.clickedWord = changedWord
      );

      this.wordservice.onHoveredWord.subscribe(
       (changedWord: Word) => this.hoveredWord = changedWord
     );
     this.wordservice.offHoveredWord.subscribe(
       (changedWord: Word) => { this.hoveredWord = null; }
     );

      this.wordservice.onHoveredLine.subscribe(
         (changedLine: Line) => { this.hoveredLine = changedLine;}
      );

     this.wordservice.offHoveredLine.subscribe(
       (changedLine: Line) => { this.hoveredLine = null; }
     );
   }
   ngOnChanges(changes: SimpleChanges) {
      if (this.image.text_field != null) {
         this.updateImageProperties();
      }
   }
   private updateImageProperties(){
      let image_left = this.image.text_field.left;
      let image_top = this.image.text_field.top;
      this.image_width = this.image.text_field.width;
      this.image_height = this.image.text_field.height;
      this.local_zoom = this.max_height/this.image.text_field.height;
      this.imageSpec.x = this.image.x;
      this.imageSpec.y = this.image.y;
      this.imageSpec.height = this.image.height;
      this.imageSpec.width = this.image.width;
      this.viewBox = image_left + ' ' +  image_top + ' ' + this.image_width + ' ' + this.image_height;
   }
   private getHoverStatus(word: Word): string {
       if (this.findText != null && this.findText != ''){
         return (word.text.match(this.findText) 
                || (word.edited_text != null && word.edited_text.match(this.findText))
         ) ? HIGHTLIGHT_CASES.SEARCHED_WORD : HIGHTLIGHT_CASES.DEFAULT 
      }
      if (typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null) {
         return (this.hoveredLine[this.identification_key] == word.line) ? HIGHTLIGHT_CASES.LINE_HOVERED : HIGHTLIGHT_CASES.DEFAULT; 
      } else if (typeof this.hoveredWord !== 'undefined' && this.hoveredWord !== null){
         return (this.hoveredWord[this.identification_key] == word[this.identification_key]) ?  HIGHTLIGHT_CASES.WORD_HOVERED : HIGHTLIGHT_CASES.DEFAULT;
      } 
      return HIGHTLIGHT_CASES.DEFAULT;
   }
   private assignClass(word: Word): string {
      switch(this.getHoverStatus(word)) {
         case HIGHTLIGHT_CASES.SEARCHED_WORD: {
            return 'textfield highlight_red';
         }
         case HIGHTLIGHT_CASES.LINE_HOVERED: {
            return 'textfield highlight_yellow'
         }
         case HIGHTLIGHT_CASES.WORD_HOVERED: {
            return 'textfield highlight_yellow'
         }
         case HIGHTLIGHT_CASES.DEFAULT: {
            return (this.externalAssignClassAfter != null) ? this.externalAssignClassAfter(word, this.hoveredWord, this.hoveredLine) : 'textfield unhighlighted';
         }
      }
  }
}
