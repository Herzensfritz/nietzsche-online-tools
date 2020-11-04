export interface Actions {
   target_file: string;
   date_stamp: number;
   response_handlers: ResponseHandler[];
   result?: string;
}
export interface Image {
   width: number;
   height: number;
   file_name: string;
   URL: string;
   text_field: TextField;
   transform?: string;
}
export interface Line {
   id: number;
   bottom: number;
   top: number;
}
export interface MyData {
   title: string;
   number: string;
   svg: Image;
   words: Word[];
   lines: Line[];
   actions: Actions;
}
export interface Response {
   target_file: string;
   date_stamp: number;
   response_handler: ResponseHandler;
   words: Word[];
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
export interface Word { 
   id: number;
   text: string;
   edited_text?: string;
   left: number;
   top: number;
   width: number;
   height: number;
   line: number;
   tp_id: string;
   deleted: boolean;
   transform?: string; 
   earlier_version?: string;
   overwrites_word?: string;
   part_text?: string;
}

