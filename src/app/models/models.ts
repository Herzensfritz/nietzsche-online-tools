import { Image, Line, IdWord } from '../page-view/models';

export interface Actions {
   target_file: string;
   date_stamp: number;
   response_handlers: ResponseHandler[];
   result?: string;
}
export interface MyData {
   title: string;
   number: string;
   svg: Image;
   words: EditableWord[];
   lines: Line[];
   actions: Actions;
}
export interface Response {
   target_file: string;
   date_stamp: number;
   response_handler: ResponseHandler;
   words: EditableWord[];
}
export interface ResponseHandler{
   action_name: string;
   description: string;
   requirements?: Requirement[];
}
export interface Requirement {
   name: string;
   type: any;
   input?: any;
}
export interface TextField {
   width: number;
   height: number;
   left: number;
   top: number;
   bottom: number;
}
export interface EditableWord extends IdWord { 
   id: number;
   text: string;
   edited_text?: string;
   left: number;
   top: number;
   width: number;
   height: number;
   line: number;
   tp_id?: string;
   fp_id?: string;
   deleted: boolean;
   transform?: string; 
   earlier_version?: string;
   overwrites_word?: string;
   part_text?: string;
}

