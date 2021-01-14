import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { externalAssignClass, externalAssignStyle, Configuration, Identifier, Image, Line, TextByForeignHand, Word} from './models';
/**
 * This component displays one or two {@link /components/TextFieldComponent.html|TextFieldComponent(s)} 
 * and its or their {@link /components/MarginFieldComponent.html|MarginFieldComponent(s)}.
 **/
@Component({
  selector: 'page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
   @Input() configuration: Configuration;
   /**
    * the search text of words that should be highlighted as {@link /miscellaneous/enumerations.html#HIGHTLIGHT_CASES|HIGHTLIGHT_CASES.SEARCHED_WORD}.
    **/
   @Input() findText: string;
   /**
    * first texts written by foreign hand 
    **/
   @Input() first_foreign_texts: TextByForeignHand[] = [];
   /**
    * the first image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
    **/
   @Input() first_image: Image;
   /**
    * the Array of lines of the first image that will be displayed by {@link /components/MarginFieldComponent.html|MarginFieldComponent}.
    **/
   @Input() first_lines: Line[];
   /**
    * Identification of first textfield.
    **/
   first_textfield_id: string = 'first textfield'
   /**
    * the Array of words of the first image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
    **/
   @Input() first_words: Word[];
   /**
    * the (initial) maximum height of the image(s).
    **/
   @Input() max_height: number = -1;
   /**
    * should primary Url be used for image. Use secondary Url if false.
    **/
   @Input() preferPrimaryUrl: boolean = true;
   /**
    * second texts written by foreign hand 
    **/
   @Input() second_foreign_texts: TextByForeignHand[] = [];
   /**
    * the second image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
    **/
   @Input() second_image: Image;
   /**
    * the Array of lines of the second image that will be displayed by {@link /components/MarginFieldComponent.html|MarginFieldComponent}.
    **/
   @Input() second_lines: Line[];
   /**
    * Identification of second textfield.
    **/
   second_textfield_id: string = 'second textfield'
   /**
    * the Array of words of the second image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
    **/
   @Input() second_words: Word[];
   /**
    * An optional function that will be passed to {@link /components/TextFieldComponent.html|TextFieldComponent} 
    * in order to return a further highlight class
    * to the word rects when the internal function would return 'textfield unhighlighted'. 
    **/
   @Input('assignClass') assignClass?: externalAssignClass;
   /**
    * An optional function that will be passed to {@link /components/TextFieldComponent.html|TextFieldComponent}
    * and {@link /components/MarginFieldComponent.html|MarginFieldComponent}
    * in order to return a (svg-)style object 
    * to the word and line rects. This function allows the user to extend the style of this component.
    * E.g. by returning { fill: blue } the function overwrites the default behaviour and sets
    * the default highlight color to blue.
    **/
   @Input('assignStyle') assignStyle?: externalAssignStyle;
   /**
    * global zoom factor.
    **/
   @Input() zoomFactor: number = 1;
   /**
    * identifiers of selected words that should be highlighted.
    **/
   @Input() selectedWords: Identifier[] = [];
   /**
    * identifiers of selected lines that should be highlighted.
    **/
   @Input() selectedLines: Identifier[] = [];

  constructor() {}
  
  /**
   * sets {@link /components/PageViewComponent.html#max_height|max_height} if it is unset.
   **/
  ngOnInit() {
      if (this.max_height == -1){
         this.max_height = screen.availHeight;
      }
  }
  /**
   * Returns whether the two images can be displayed as columns.
   **/
  private hasColumnStyle(): boolean {
     if (this.zoomFactor <= 1 || this.first_image == null || this.second_image == null){
        return true 
     }
     let newLeftWidth = this.max_height/this.first_image.text_field.height*this.zoomFactor*this.first_image.text_field.width;
     let newRightWidth = this.max_height/this.second_image.text_field.height*this.zoomFactor*this.second_image.text_field.width;
     return newLeftWidth + newRightWidth < screen.availWidth;
  }
}
