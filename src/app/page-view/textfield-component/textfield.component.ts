import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignClass, externalAssignStyle, Configuration, Identifier, Image, Line, PositionalObject, TextByForeignHand, Word, USE_EXTERNAL_TOOLTIP} from '../models';
import { PageViewService } from '../page-view.service';
import { HIGHTLIGHT_CASES } from '../highlight_status';
import { ConfigurableComponent } from '../configurable-component';
/**
 * This component displays an image with word hovers.
 **/
@Component({
   selector: 'text-field',
   templateUrl: './textfield.component.html',
   styleUrls: ['./textfield.component.css']
})
export class TextFieldComponent extends ConfigurableComponent implements OnInit, OnChanges {
   /**
    * scrollable HTML-container of this textfield
    **/
   @Input() container: HTMLElement;
   /**
    * the currently clicked word
    * */
   clickedWord?: Word;
   /**
    * the search text of words that should be highlighted as {@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES.SEARCHED_WORD}.
    **/
   @Input() findText: string;
   /**
    * texts written by foreign hand 
    **/
   @Input() foreign_texts: TextByForeignHand[] = [];
   /**
    * the currently hovered line
    * */
   hoveredLine?: Line;
   /**
    * the currently hovered text by foreign hand 
    * */
   hoveredTextByForeignHand?: TextByForeignHand;
   /**
    * the currently hovered word
    * */
   hoveredWord?: Word;
   /**
    * the image that will be displayed.
    **/
   @Input() image: Image;
   /**
    * textfield's identity.
    **/
   @Input() identity: string = 'first textfield';
   /**
    * The (unzoomed) height of the root svg. 
    *
    * (The actual height is 'image_height*local_zoom*zoomFactor'
    * */
   image_height: number = 400;
   /**
    * image properties for the svg-image.
    * */
   imageSpec = { x: 0, y: 0, height: 973.91998, width: 2038.5601, URL: null, secondaryURL: null };
   /**
    * The (unzoomed) width of the root svg. 
    *
    * (The actual width is 'image_width*local_zoom*zoomFactor'
    * */
   image_width: number = 300;
   /**
    * the viewBox of the root svg specifying the area of the svg that will be shown.
    * */
   viewBox: string = '';
   /**
    * the (initial) maximum height of the image.
    **/
   @Input() max_height: number = -1;
   /**
    * should primary Url be used for image. Use secondary Url if false.
    **/
   @Input() preferPrimaryUrl: boolean = true;
   /**
    * Use extended tooltip.
    **/
   @Input() useExtendedTooltip: boolean = false;
   /**
    * the words that will be displayed as rects on the image.
    **/
   @Input() words: Word[];
   /**
    * global zoom factor.
    **/
   @Input() zoomFactor: number = 1;
   /**
    * local zoom factor that sets the height and width of the image according to {@link #max_height|max_height}. 
    * */
   local_zoom: number = 1;
   /**
    * An optional function that can be passed to this component in order to return a further highlight class
    * to the word rects when the internal function would return 'textfield unhighlighted'. 
    **/
   @Input('assignClass') externalAssignClassAfter?: externalAssignClass;
   /**
    * An optional function that can be passed to this component in order to return a (svg-)style object 
    * to the word rects. This function allows the user to extend the style of this component.
    * E.g. by returning { fill: blue } the function overwrites the default behaviour and sets
    * the default highlight color to blue.
    **/
   @Input('assignStyle') extAssignStyle?: externalAssignStyle;
   /**
    * identifiers of selected words that should be highlighted.
    **/
   @Input() selectedWords: Identifier[] = [];
   /**
    * identifiers of selected lines that should be highlighted.
    **/
   @Input() selectedLines: Identifier[] = [];
   /**
    * @param pageViewService an information source about (un-)hovered and clicked Lines/Words.
    * */
   constructor( protected pageViewService: PageViewService) { 
      super()
   }
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
     this.pageViewService.onClickedWord.subscribe(
       (changedWord: Word ) => this.clickedWord = changedWord
      );
     this.pageViewService.onHoveredWord.subscribe(
       (changedWord: Word) => this.hoveredWord = changedWord
     );
     this.pageViewService.offHoveredWord.subscribe(
       (changedWord: Word) => { this.hoveredWord = null; }
     );
     this.pageViewService.onHoveredLine.subscribe(
         (changedLine: Line) => { this.hoveredLine = changedLine;}
      );
     this.pageViewService.offHoveredLine.subscribe(
       (changedLine: Line) => { this.hoveredLine = null; }
     );
     this.pageViewService.onHoveredTextByForeignHand.subscribe(
         (changedForeignText: TextByForeignHand) => { this.hoveredTextByForeignHand = changedForeignText;}
      );
     this.pageViewService.offHoveredTextByForeignHand.subscribe(
       (changedForeignText: TextByForeignHand) => { this.hoveredTextByForeignHand = null; }
     );
   }
   ngOnChanges() {
      super.ngOnChanges()
      if (this.image.text_field != null) {
         this.updateImageProperties();
      }
   }
   /**
    * Update image properties: use textfield in order to specify the area of the image that will be shown.
    *
    * @param URL set alternative image url. This will be used on image load error (see Template)
    **/
   private updateImageProperties(URL?: string){
      let previous_word: Word = null;
      for (var i = 0; i < this.words.length; i++){
         this.words[i].datatype = "Word";
         if (previous_word == null || previous_word.id != this.words[i].id){
            previous_word = this.words[i]
            previous_word.is_top_object = true;
         } else if (previous_word.top > this.words[i].top){
            previous_word.is_top_object = false;
            previous_word = this.words[i]
            previous_word.is_top_object = true;
         } else {
            this.words[i].is_top_object = false;
         }
      }
      this.foreign_texts.forEach(foreignText =>foreignText.datatype = "TextByForeignHand");
      let image_left = this.image.text_field.left;
      let image_top = this.image.text_field.top;
      this.image_width = this.image.text_field.width;
      this.image_height = this.image.text_field.height;
      this.local_zoom = this.max_height/this.image.text_field.height;
      this.imageSpec.x = this.image.x;
      this.imageSpec.y = this.image.y;
      this.imageSpec.height = this.image.height;
      this.imageSpec.width = this.image.width;
      this.imageSpec.URL = (this.preferPrimaryUrl) ? this.image.URL : this.image.secondaryURL;
      this.imageSpec.secondaryURL = (this.preferPrimaryUrl) ? this.image.URL : this.image.URL;
      if (URL != null){
         this.imageSpec.secondaryURL = this.imageSpec.URL
         this.imageSpec.URL = URL;
      }
      this.viewBox = image_left + ' ' +  image_top + ' ' + this.image_width + ' ' + this.image_height;
   }
   /**
    * Get the hover status of the word as one of the {@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES}.
    **/
   private getHoverStatus(word: Word): string {
       if (this.selectedWords.indexOf(word.id) > -1
          || this.selectedLines.indexOf(word.line) > -1){
         return HIGHTLIGHT_CASES.SELECTED_WORD;
       }
       if (this.findText != null && this.findText != ''){
         return (word.text.match(this.findText) 
                || (word.edited_text != null && word.edited_text.match(this.findText))
         ) ? HIGHTLIGHT_CASES.SEARCHED_WORD : HIGHTLIGHT_CASES.DEFAULT 
      }
      if (typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null) {
         return (this.hoveredLine.id == word.line) ? HIGHTLIGHT_CASES.LINE_HOVERED : HIGHTLIGHT_CASES.DEFAULT; 
      } else if (typeof this.hoveredWord !== 'undefined' && this.hoveredWord !== null){
         return (this.hoveredWord.id == word.id) ?  HIGHTLIGHT_CASES.WORD_HOVERED : HIGHTLIGHT_CASES.DEFAULT;
      } 
      return HIGHTLIGHT_CASES.DEFAULT;
   }
   /**
    * Return a css class for word that will be used with [ngClass] in order to (un-)highlight the word's rect. 
    *
    * If a function has been passed to Input {@link #assignClass|assignClass},
    * this function will call it if {@link #getHoverStatus|getHoverStatus(word)} == {@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES.DEFAULT}.
    **/
   private assignClass(positionalObject: PositionalObject, elementName?: string): string {
      if (positionalObject.datatype == 'TextByForeignHand'){
         return (this.hoveredTextByForeignHand != null && this.hoveredTextByForeignHand.id == positionalObject.id) ? 
            'text_field highlight_foreign_text' : 'text_field unhighlighted'
      }
      let word = <Word>positionalObject;
      if (elementName != null) {
         return (this.getHoverStatus(word) == HIGHTLIGHT_CASES.DEFAULT) ? `text_field unhighlighted_${elementName}` : `text_field highlight_${elementName}`;
      }
      switch(this.getHoverStatus(word)) {
         case HIGHTLIGHT_CASES.SELECTED_WORD: {
            return 'textfield highlight_magenta';
         }
         case HIGHTLIGHT_CASES.SEARCHED_WORD: {
            return 'textfield highlight_red';
         }
         case HIGHTLIGHT_CASES.LINE_HOVERED: {
            return (word.deleted) ? 'textfield deleted' : 'textfield highlight_yellow';
         }
         case HIGHTLIGHT_CASES.WORD_HOVERED: {
            return (word.deleted) ? 'textfield deleted' : 'textfield highlight_yellow';
         }
         case HIGHTLIGHT_CASES.DEFAULT: {
            return (this.externalAssignClassAfter != null) ? this.externalAssignClassAfter(word, this.hoveredWord, this.hoveredLine) : 'textfield unhighlighted';
         }
      }
  }
  /**
  * Assign a style to the rects of a line.
  **/
  private assignStyle(word: Word, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object {
      return (this.extAssignStyle != null) ? this.extAssignStyle(word, hoveredWord, hoveredLine, hoverStatus) : {};
  }
}
