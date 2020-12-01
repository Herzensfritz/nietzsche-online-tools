export interface externalAssignClass {
   (currentWord: Word, hoveredWord: Word, hoveredLine: Line): string;
}
export interface externalAssignStyle {
   (currentItem: Line | Word, hoveredWord: Word, hoveredLine: Line, hoverStatus: string): Object;
}
export interface Image {
   x: number;
   y: number;
   width: number;
   height: number;
   filename: string;
   URL: string;
   secondaryURL?: string;
   text_field: TextField;
   transform?: string;
}
export interface Line {
   id: number;
   iri?: string;
   bottom: number;
   top: number;
}
export interface TextField {
   width: number;
   height: number;
   left: number;
   top: number;
}
export interface BaseWord { 
   text: string;
   edited_text?: string;
   left: number;
   top: number;
   width: number;
   height: number;
   line: string | number;
   line_number: number;
   deleted: boolean;
   transform?: string; 
}
export interface IRIWord extends BaseWord { 
   iri: string;
}
export interface IdWord extends BaseWord { 
   id: number;
}
export type Word = IRIWord | IdWord
