import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignStyle, Line, TextField, Word} from '../models';
import { PageViewService } from '../page-view.service';
import { HIGHTLIGHT_CASES } from '../highlight_status';
/**
 * This component displays an Array of lines.
 **/
@Component({
  selector: 'margin-field',
  templateUrl: './margin-field.component.html',
  styleUrls: ['./margin-field.component.css']
})
export class MarginFieldComponent implements OnInit, OnChanges {
   /**
    * scrollable HTML-container of this textfield
    **/
   @Input() container: HTMLElement;
   /**
    * the hovered status for a line
    **/
   HOVERED_STATUS: string = HIGHTLIGHT_CASES.LINE_HOVERED
   /**
    * the currently hovered line
    * */
   hoveredLine?: Line;
   /**
    * the currently hovered word
    * */
   hoveredWord?: Word;
   /**
    * an Array of lines that will be displayed.
    **/
   @Input() lines: Line[];
   /**
    * the height of a line rect.
    **/
   line_height: number = 8;
   /**
    * the length of the line rect.
    **/
   line_length: number = 10;
   /**
    * x coordinate of the line rect.
    **/
   line_x: number = 5;
   /**
    * the height of the margin field.
    **/
   margin_height: number = 973.91998;
   /**
    * geometrical top position of the margin field.
    **/
   margin_top: number = 0;
   /**
    * the width of the margin field.
    **/
   margin_width: number = 30;
   /**
    * The area of the image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
    * The height of the text_field determines  {@link #margin_height|margin_height}, while its top position
    * determines {@link #margin_top|margin_top}.
    **/
   @Input() text_field: TextField;
   /**
    * The viewbox of this svg component.
    **/
   viewBox: string = '';
   /**
    * initial maximum height of margin field.
    **/
   @Input() max_height: number = -1;
   /**
    * global zoom factor
    **/
   @Input() zoomFactor: number = 1;
   /**
    * An optional function that can be passed to this component in order to return a (svg-)style object 
    * to the line rects. This function allows the user to extend the style of this component.
    * E.g. by returning { fill: blue } the function overwrites the default behaviour and sets
    * the default highlight color to blue.
    **/
   @Input('assignStyle') extAssignStyle?: externalAssignStyle;
   /**
    * local zoom factor
    **/
   local_zoom: number = 1;

   /**
    * @param lineservice an information source about (un-)hovered and clicked Lines/Words.
    **/
   constructor( private lineservice: PageViewService) { }

  /**
   * Initialize geometrical information and subscribe to {@link /injectables/PageViewService.html|PageViewService}.
   **/
  ngOnInit() {
      if (this.max_height == -1){
         this.max_height = screen.availHeight;
      }
      this.viewBox = 0 + ' ' +  this.margin_top + ' ' + this.margin_width + ' ' + this.margin_height;
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
  /**
   * Update viewBox if there is a change.
  **/
  ngOnChanges(changes: SimpleChanges) {
      if (this.text_field != null) {
         this.updateViewBox()
      } 
  }
  /**
   * Update viewBox: set 
   * {@link #margin_height|margin_height}, 
   * {@link #margin_top|margin_top},
   * {@link #viewBox|viewBox}
   * and {@link #local_zoom|local_zoom} according to 
   * {@link #text_field|text_field}.
  **/
  private updateViewBox(){
     this.lines.forEach(line =>line.datatype = "Line");
     this.margin_height = this.text_field.height;
     this.margin_top = this.text_field.top;
     this.viewBox = 0 + ' ' +  this.margin_top + ' ' + this.margin_width + ' ' + this.margin_height;
     this.local_zoom = this.max_height/this.text_field.height;
  }
  /**
   * Get the hover status of a line, i.e. whether it is hovered 
   * ({@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES.LINE_HOVERED})
   * or not ({@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES.DEFAULT}).
   **/
  private getHoverStatus(line: Line): string {
     if ( (typeof this.hoveredLine !== 'undefined' && this.hoveredLine !== null && line === this.hoveredLine) 
     || (typeof this.hoveredWord !== 'undefined' && this.hoveredWord !== null && line.id == this.hoveredWord.line))  {
         return HIGHTLIGHT_CASES.LINE_HOVERED; 
     } else {
         return HIGHTLIGHT_CASES.DEFAULT; 
     }
  }
   /**
    * Assign a style to the rects of a line.
    **/
   private assignStyle(line: Line, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object {
      return (this.extAssignStyle != null) ? this.extAssignStyle(line, hoveredWord, hoveredLine, hoverStatus) : {};
   }

}
