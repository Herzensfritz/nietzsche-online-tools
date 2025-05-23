import { Component, Input, OnInit } from '@angular/core';
import {Actions, Requirement, Response, ResponseHandler, EditableWord} from '../models/models';
import { PageViewService } from '../page-view/page-view.service';

const TIMESTAMP_NOT_SET: number = -1;

@Component({
  selector: 'action-tab',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
   @Input() actions: Actions;
   @Input() send: (response: Response) => void;
   @Input() disposeOldResultMessage: () => void;
   @Input() removeWord: (word: EditableWord) => void;
   @Input() words: EditableWord[];
   response_handler: ResponseHandler; 

   constructor( ) { }

   ngOnInit() { }

   private addDeletionPath(word: EditableWord, deletion_path: string){
      word.deletion_path = deletion_path;
   }
   private resetResponseHandler(){
      this.response_handler = null;
   }
   private sendChange(response_handler: ResponseHandler){
      if (response_handler.requirements != null 
         && response_handler.requirements.length > 0 
         && response_handler.requirements[0].input == null){
            this.response_handler = response_handler;         
      } else {
         this.resetResponseHandler();
         let response: Response = { 'target_file': this.actions.target_file, 'date_stamp': this.actions.date_stamp,
                                 'response_handler': response_handler, 'words': this.words }
         this.disposeOldResultMessage();
         this.send(response);
      }
   }
   private changePage(new_target_file: string){
      let response_handler: ResponseHandler = { action_name: 'reload', description: 'change page for edition'};
      let response: Response = { 'target_file': new_target_file, 'date_stamp': TIMESTAMP_NOT_SET,
                                 'response_handler': response_handler, 'words': [] }
      this.disposeOldResultMessage();
      this.send(response);
   }
   private updateWord(wordA: EditableWord, new_id: number){
      wordA.old_id = wordA.id;
      wordA.id = Number(new_id);
   }
   private getWordIds(): Number[] {
      let ids = [];
      for (var i = 0; i < this.words.length; i++){
         if (ids.indexOf(this.words[i].id) == -1) {
            ids.push(this.words[i].id); 
         }
         if (this.words[i]['old_id'] != null && ids.indexOf(this.words[i].old_id) == -1) {
            ids.push(this.words[i].old_id); 
         }
      }
      return ids
   }
}

