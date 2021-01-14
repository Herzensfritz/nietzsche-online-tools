/**
 * This interface specifies a function that returns a style class string (e.g. 'textfield unhighlighted')
 * that can be passed to [ngClass].
 **/
export interface externalAssignClass {
   (currentWord: Word, hoveredWord: Word, hoveredLine: Line): string;
}
/**
 * This interface specifies a function that returns a style Object (e.g. { fill: red })
 * that can be passed to [ngStyle].
 **/
export interface externalAssignStyle {
   (currentItem: Line | Word, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object;
}
/**
 * This interface specifies a configuration
 * */
export interface Configuration {
   [name: string]: any; 
}
/**
 * This interface specifies an object that can interact with  {@link /injectables/PageViewService.html|PageViewService}.
 **/
export interface Interactable {
   /** 
    * the string representation of the Interactable's interface type 
    * ({@link /interfaces/Word.html|Word}|{@link /interfaces/Line.html|Line}|{@link /interfaces/TextByForeignHand.html|TextByForeignHand}).
    **/
   datatype?: string;
   /** 
    * the identity of the textfield to which this Interactable belongs. 
    **/
   textfield_identity?: string;
   /**
    * is Interactable top object
    **/
   is_top_object?: boolean;
}
/**
 * This interface specifies the image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
 **/
export interface Image {
   /** x coordinate of image 
   **/
   x: number;
   /** y coordinate of image 
   **/
   y: number;
   /** width of image 
   **/
   width: number;
   /** height of image 
   **/
   height: number;
   /** filename of image 
   **/
   filename: string;
   /** primary URL of image 
   **/
   URL: string;
   /** secondary URL of image 
   **/
   secondaryURL?: string;
   /** displayable area of image 
   **/
   text_field: TextField;
   /** matrix transformation string
    **/
   transform?: string;
}
/**
 * This interface specifies a line that will be displayed by {@link /components/MarginFieldComponent.html|MarginFieldComponent}.
 **/
export interface Line extends Interactable {
   /** the line number
    **/
   number: number;
   /** the (optional) IRI of this line
    **/
   id: Identifier;
   /** geometrical bottom position of this line
    **/
   bottom: number;
   /** geometrical top position of this line
    **/
   top: number;
}
/**
 * This interface specifies the area of an image that will be displayed by {@link /components/TextFieldComponent.html|TextFieldComponent}.
 **/
export interface TextField {
   /** the width of this textfield
    **/
   width: number;
   /** the height of this textfield
    **/
   height: number;
   /** the geometrical left position of this textfield
    **/
   left: number;
   /** the geometrical top position of this textfield
    **/
   top: number;
}
/**
 * This type specifies an identifier for words/lines (by its IRI string or its id number)
 **/
export type Identifier = string | number;
/** 
 * Any svg path with an optional type.
 **/
export interface Path  {
   id: Identifier;
   d: string;
   type?: string;
}
/**
 * geometrical Point
 **/
export interface Point {
   visible: boolean
   clientX: number;
   clientY: number;
   layerX: number;
   layerY: number;
}
/**
 * This interface specifies a postional object that can be displayed as a rect on the image by {@link /components/TextFieldComponent.html|TextFieldComponent}.
 **/
export interface PositionalObject extends Interactable {
   /** the identifier of a positional object (i.e. 'IRI' (string) or 'id' (number))
    **/
   id: Identifier;
   /** the geometrical left position of this word's rect.
    **/
   left: number;
   /** the geometrical top position of this word's rect.
    **/
   top: number;
   /** the width of this word's rect.
    **/
   width: number;
   /** the height of this word's rect.
    **/
   height: number;
   /** the matrix transformation string of the geometrical position of this word's rect.
    **/
   transform?: string; 
}
/**
 * This interface specifies a text written by a foreign hand.
 **/
export interface TextByForeignHand extends PositionalObject {
   /**
    * pen used for writing text
    **/
   pen: string;
   /**
    * text by foreign hand 
    **/
   text: string;
}
/**
 * This interface specifies a word that can be displayed as a rect on the image by {@link /components/TextFieldComponent.html|TextFieldComponent}.
 **/
export interface Word extends PositionalObject { 
   /** the (raw) text of this word.
    **/
   text: string;
   /** the text of this word as it has been edited by the editors.
    **/
   edited_text?: string;
   /** the identification of the line to which this word belongs (iri or id).
    **/
   line: string | number;
   /** the number of the line to which this word belongs.
    **/
   line_number: number;
   /** is this word deleted.
    **/
   deleted: boolean;
   /** a deletion path
    **/
   deletion_path?: string;
}
export const USE_EXTERNAL_TOOLTIP: string = 'UseExternalTooltip';
