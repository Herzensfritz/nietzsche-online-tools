import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import wordData from '../assets/test.json';
import {MyData, Response, ResponseHandler, EditableWord} from './models/models';
import { PageViewService } from './page-view/page-view.service';
import { HIGHTLIGHT_CASES} from './page-view/highlight_status';
import { externalAssignClass, externalAssignStyle, Image, Identifier, TextField, Line, Word } from './page-view/models';
import { DataService } from './services/data.service';

const WORD_CORRESPONDANCE: string = 'faksimile/transkription word correspondance'


class Point {
   left: number;
   top: number;
   constructor(left: number, top: number){
      this.left = left;
      this.top = top;
   }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageViewService ]
})
export class AppComponent implements OnInit {
   app_title = 'Nietzsche Online Tools';
   actions: any;
   findText: string = ''
   max_page_height: number = 700;
   numWords: string = "0";
   positionWords: boolean = false;
   svg_lines: Line[];
   svg: Image;
   faksimile: Image;
   faksimile_words: EditableWord[];
   faksimile_lines: Line[];
   potentialDoubleLines: Line[];
   potentialDoubleLineId: Identifier;
   potentialDoubleWords: EditableWord[];
   potentialDoubleWordId: Identifier;
   selectedWords: EditableWord[] = [];
   title = this.app_title
   showActions: boolean = true;
   showFaksimile: boolean = false;
   savedTextfield: TextField = null;
   words: EditableWord[] = [];
   current_task: string;
   tmpWords: EditableWord[] = [];
   tmpFaksimileWords: EditableWord[] = [];
   highlightSelected: Identifier[] = [];
   zoomFactor: number = 2;
   offset: number = 10;
   KEY_CODE =  { 'ArrowRight': new Point(this.offset, 0), 
      'ArrowUp':  new Point(0, this.offset*-1),
      'ArrowDown': new Point(0, this.offset ),
      'ArrowLeft': new Point(this.offset*-1, 0)};

   constructor(private dataService: DataService, private wordservice: PageViewService, private route: ActivatedRoute ) {}

   ngOnInit() {
      this.max_page_height = screen.availHeight - 400;
      this.dataService.getHttpJSON().subscribe(mydata => {
         this.updateData(mydata);
      })
      this.route.queryParams.subscribe(params => {
         this.findText = params['find'];
      });
      this.wordservice.onClickedWord.subscribe(
         (changedWord: EditableWord) => { this.addWord(changedWord); }
      );
   }
   private addWord(word: EditableWord){
      if (this.selectedWords.indexOf(word) == -1){
         this.selectedWords.push(word);
      }
   }
   assignClass: externalAssignClass = (currentWord: EditableWord, hoveredWord: EditableWord, hoveredLine: Line): string => {
      if (this.potentialDoubleWordId != null && this.potentialDoubleWordId != '' && currentWord.id == this.potentialDoubleWordId){
         return 'text_field highlight_magenta'
      }
      if (this.showFaksimile || hoveredWord != null || hoveredLine != null) {
         return 'textfield unhighlighted'
      }
      return (currentWord.id % 2 == 0) ? 'textfield highlight_magenta' : 'textfield highlight_yellow';
   }
   private assignHiddenClass() {
      return (this.selectedWords.length > 0 && this.positionWords) ? 'hidden': 'auto' ;
   }
   removeWord = (word: EditableWord): void => {
      this.selectedWords = this.selectedWords.filter(item =>item !== word)
   }
   private addWords(){
      if (this.words.length < 50){
          for(var i = 0; i < this.words.length; i++){
            this.addWord(this.words[i]);
          }
      }
   }
   private removeWords(){
      this.selectedWords = [];
   }
   send = (response: Response): void => {
      this.selectedWords = [];
      this.dataService.send(response).subscribe(mydata =>{
         this.updateData(mydata);
      });
   }
   disposeOldResultMessage = (timeout: number = 0): void => {
      setTimeout(()=>{this.actions.result = null}, timeout);
   }
   private resetFindText() {
      this.findText = null;
   }
   private resetPoints() {
      this.KEY_CODE =  { 'ArrowRight': new Point(this.offset, 0), 
      'ArrowUp':  new Point(0, this.offset*-1),
      'ArrowDown': new Point(0, this.offset ),
      'ArrowLeft': new Point(this.offset*-1, 0)};
   }
   private updateData(mydata: MyData) {
         this.actions = mydata.actions
         this.svg = mydata.svg;
         this.svg_lines = mydata.lines;
         this.words = mydata.words;
         this.faksimile = mydata.faksimile;
         this.faksimile_words = mydata.faksimile_positions
         this.faksimile_lines = mydata.faksimile_lines
         this.tmpWords = this.words.slice();
         this.tmpFaksimileWords = this.faksimile_words.slice();
         this.title = this.app_title + ": " + mydata.title + ", " + mydata.number;
         if (this.actions.result != null && this.actions.result != undefined
         && this.actions.result.includes('succeeded!') && !this.actions.result.includes('WARNING')){ 
            this.disposeOldResultMessage(2000);
         }
         if (!this.current_task && this.actions && this.actions.tasks.length > 0){
            this.current_task = this.actions.tasks[0]
         }
         if (this.current_task != null){
            this.showFaksimile = (this.current_task == WORD_CORRESPONDANCE)
            if (this.current_task == WORD_CORRESPONDANCE){
               this.updatePotentialDoubles()
            }
         }
   }
   private updateWords() {
      if (this.findText != null && this.findText != ''){
         this.words = [];
         this.words = this.tmpWords.filter(word => word.text.match(this.findText) || (word.edited_text != null && word.edited_text.match(this.findText)));
         this.faksimile_words = [];
         this.faksimile_words = this.tmpFaksimileWords.filter(word => word.text.match(this.findText) || (word.edited_text != null && word.edited_text.match(this.findText)));
      } else if (this.tmpWords.length > 0) {
         this.words = this.tmpWords.slice();
         this.faksimile_words = this.tmpFaksimileWords.slice();
      }
   }
   private updatePotentialDoubles() {
      this.potentialDoubleLines = [];
      let uneven_lines = this.faksimile_lines.filter(line =><number>(line.id) % 2 == 1);
      for (const line of uneven_lines.values()){
         let words_on_line = this.faksimile_words.filter(word =>word.line == line.id)
         let unique_words = [...new Set(Array.from(words_on_line, word=>word.text))]
         if (words_on_line.length > unique_words.length){
            this.potentialDoubleLines.push(line)
         }
      }
      if (this.potentialDoubleLines.length > 0){
         this.updatePotentialDoubleWords(this.potentialDoubleLines[0].id);
      }
   }
   private updatePotentialDoubleWords(line: Identifier) {
      this.potentialDoubleWords = [];
      this.potentialDoubleWordId = '';
      this.potentialDoubleLineId = line;
      let words_on_line = this.faksimile_words.filter(word =>word.line == line)
      let unique_words = [...new Set(Array.from(words_on_line, word=>word.text))]
      if (words_on_line.length > unique_words.length){
         for(const text of unique_words.values()){
            let words_with_text = words_on_line.filter(word =>word.text == text)
            if (words_with_text.length > 1){
               words_with_text.forEach(word =>this.potentialDoubleWords.push(word));
            }
         }
      }
   }
   private showPotentialDoubles(id: Identifier){
      this.potentialDoubleWordId = id;
      if (this.potentialDoubleWordId != null && this.potentialDoubleWordId != ''){
         this.words.filter(word =>word.id == this.potentialDoubleWordId).concat(
            this.faksimile_words.filter(word =>word.id == this.potentialDoubleWordId)).forEach(
               word => {this.wordservice.onHoverService(word, { visible: true, layerX: -1, layerY: -1, clientX: -1, clientY: -1});
                        this.wordservice.offHoverService(word, { visible: true, layerX: -1, layerY: -1, clientX: -1, clientY: -1})});
         
      }
   }
   private setTask(task: string){
      this.current_task = task;
   }
   private taskDone(){
      if (this.current_task){
         let response_handler: ResponseHandler = { action_name: 'set task done', description: 'set task done'};
         let response: Response = { 'target_file': this.actions.target_file, 'date_stamp': this.actions.date_stamp,
                                 'response_handler': response_handler, 'task': this.current_task, 'words': [] }
         this.current_task = null;
         this.send(response);
      }
   }
   private setZoomFactor(newZoomFactor: number) {
      this.zoomFactor = newZoomFactor; 
   }
   private toggleShowTextFieldOnly() {
      if (this.savedTextfield != null) {
         this.svg.text_field = this.savedTextfield;
         this.savedTextfield = null;
      } else {
         this.savedTextfield = this.svg.text_field;
         this.svg.text_field = { 'top': 0, 'left': 0, 
            'width': Number(this.svg.text_field.left)*2 + Number(this.svg.text_field.width),
            'height': Number(this.svg.text_field.top)*2 + Number(this.svg.text_field.height) }
      }
      this.svg = { 'x': this.svg.x, 'y': this.svg.y, 'filename': this.svg.filename, 'URL': this.svg.URL,
            'secondaryURL': this.svg.secondaryURL, 'text_field': this.svg.text_field,
              'width': this.svg.width,
              'height': this.svg.height 
      }
   }
  @HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    if (this.positionWords) {
       if (this.KEY_CODE[event.key] != null){
         this.moveWords(this.KEY_CODE[event.key]);
       }
    }
  }
  private moveWords(add2Position: Point){
     this.selectedWords.forEach(word =>{word.left += add2Position.left; word.top += add2Position.top});
  }
}
