import { Component, Input, OnInit } from '@angular/core';
import {Actions, Requirement, Response, ResponseHandler, Word} from '../models/models';
import { PageViewService } from '../services/field-interaction.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'action-tab',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
   @Input() actions: Actions;
   @Input() send: (response: Response) => void;
   words: Word[] = [];
   response_handler: ResponseHandler; 

   constructor( private wordservice: PageViewService) { 
   }

   ngOnInit() {
      this.wordservice.onClickedWord.subscribe(
         (changedWord: Word ) => { this.addWord(changedWord); }
      );
   }

   private addWord(word: Word){
      this.disposeOldResultMessage();
      if (this.words.indexOf(word) == -1){
         this.words.push(word);
      }
   }

   private removeWord(word: Word){
      this.words = this.words.filter(item =>item !== word)
      this.disposeOldResultMessage();
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
         this.words = [];
         this.send(response);
      }
   }
   private disposeOldResultMessage(){
      this.actions.result = null;
   }
}
