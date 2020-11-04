import { Line, Word } from '../models/models';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
//import {NavigationServiceService} from "./navigation-service.service";

@Injectable()
export class PageViewService {
  onHoveredLine = new EventEmitter<Line>();
  offHoveredLine = new EventEmitter<Line>();
  oldClickedLine: Line;
  onClickedLine = new EventEmitter<Line>();
  onClickedWord = new EventEmitter<Word>();
  onHoveredWord = new EventEmitter<Word>();
  offHoveredWord = new EventEmitter<Word>();
  oldClickedWord: Word;

  private informationSource = new Subject<Line>(); // any clicked/interacted thing
  lineChange$ = this.informationSource.asObservable();
  private wordInformationSource = new Subject<Word>(); // any clicked/interacted thing
  wordChange$ = this.wordInformationSource.asObservable();

  updateInfo(information: Line) {
    this.informationSource.next(information);
  }
  updateWordInfo(information: Word) {
    this.wordInformationSource.next(information);
  }

  public onWordClickService(word: Word) {
    if ( word !== this.oldClickedWord) {
      this.onClickedWord.emit(word);
      this.oldClickedWord = word;
    }
  }

  public onClickService(line: Line) {
    if ( line !== this.oldClickedLine) {
      this.onClickedLine.emit(line);
      this.oldClickedLine = line;
    }
  }

  public mouseEnterService(line: Line) {
    this.onHoveredLine.emit(line);
  }

  public mouseLeaveService(line: Line) {
      this.offHoveredLine.emit(line);
  }
  public mouseEnterWordService(word: Word) {
    this.onHoveredWord.emit(word);
  }

  public mouseLeaveWordService(word: Word) {
      this.offHoveredWord.emit(word);
  }

}
