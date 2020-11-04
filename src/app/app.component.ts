import { Component, OnInit } from '@angular/core';
import wordData from '../assets/test.json';
import {Image, Line, MyData, Response, Word} from './models/models';
import {PageViewService} from './services/field-interaction.service';
import { DataService } from './services/data.service';

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
   svg_lines: Line[];
   svg: Image;
   title = this.app_title
   words: Word[];
   zoomFactor: number = 2;
  

   constructor(private dataService: DataService ) {}

   ngOnInit() {
      this.max_page_height = screen.availHeight - 400;
      this.dataService.getHttpJSON().subscribe(mydata => {
         this.actions = mydata.actions
         this.svg = mydata.svg;
         this.svg_lines = mydata.lines;
         this.words = mydata.words;
         this.title = this.app_title + ": " + mydata.title + ", " + mydata.number;
      })
   }

   send = (response: Response): void => {
      this.dataService.send(response).subscribe(mydata =>{
         this.actions = mydata.actions
         this.svg = mydata.svg;
         this.svg_lines = mydata.lines;
         this.words = mydata.words;
         this.title = this.app_title + ": " + mydata.title + ", " + mydata.number;
      });
   }
   private resetFindText() {
      this.findText = null;
   }
   private getNumFoundWords() {
      if (this.findText != null && this.findText != ''){
         return this.words.filter(word => word.text.match(this.findText) || (word.edited_text != null && word.edited_text.match(this.findText))).length;
      } 
      return 0;
   }
   private setZoomFactor(newZoomFactor: number) {
      this.zoomFactor = newZoomFactor; 
   }
}
