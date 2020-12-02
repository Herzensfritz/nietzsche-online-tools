import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import wordData from '../assets/test.json';
import {MyData, Response, EditableWord} from './models/models';
import { PageViewService } from './page-view/page-view.service';
import { HIGHTLIGHT_CASES} from './page-view/highlight_status';
import { externalAssignClass, externalAssignStyle, Image, TextField, Line, Word } from './page-view/models';
import { DataService } from './services/data.service';

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
   selectedWords: EditableWord[] = [];
   title = this.app_title
   showActions: boolean = true;
   showFaksimile: boolean = false;
   savedTextfield: TextField = null;
   words: EditableWord[] = [];
   faksimile_words: EditableWord[];
   tmpWords: EditableWord[] = [];
   tmpFaksimileWords: EditableWord[] = [];
   zoomFactor: number = 1;
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
   private updateData(mydata: MyData) {
         this.actions = mydata.actions
         this.svg = mydata.svg;
         this.svg_lines = mydata.lines;
         this.words = mydata.words;
         this.faksimile = mydata.faksimile;
         this.faksimile_words = mydata.faksimile_positions
         this.tmpWords = this.words.slice();
         this.tmpFaksimileWords = this.faksimile_words.slice();
         this.title = this.app_title + ": " + mydata.title + ", " + mydata.number;
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
