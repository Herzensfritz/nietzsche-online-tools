import {EventEmitter, Injectable} from '@angular/core';
import { Configuration, Interactable, Line, Point, TextByForeignHand, Word } from './models';
/**
 * This is an information service about clicked and (un-)hovered
 * {@link /interfaces/Line.html|Lines}, 
 * {@link /miscellaneous/typealiases.html#Word|Words}.
 * and {@link /interfaces/TextByForeignHand.html|TextByForeignHands}.
 * */
@Injectable()
export class PageViewService {
  /**
   * hovered line emitter
   **/
  onHoveredLine = new EventEmitter<Line>();
  /**
   * off hovered line emitter
   **/
  offHoveredLine = new EventEmitter<Line>();
  /**
   * clicked line emitter
   **/
  onClickedLine = new EventEmitter<Line>();
  /**
   * hovered word emitter
   **/
  onHoveredWord = new EventEmitter<Word>();
  /**
   * off hovered word emitter
   **/
  offHoveredWord = new EventEmitter<Word>();
  /**
   * clicked word emitter
   **/
  onClickedWord = new EventEmitter<Word>();
  /**
   * clicked text by foreign hand emitter
   **/
  onClickedTextByForeignHand = new EventEmitter<TextByForeignHand>();
  /**
   * hovered text by foreign hand emitter
   **/
  onHoveredTextByForeignHand  = new EventEmitter<TextByForeignHand>();
  /**
   * off hovered text by foreign hand emitter
   **/
  offHoveredTextByForeignHand  = new EventEmitter<TextByForeignHand>();
  /**
   * point where mouse hovered/clicked
   **/
   mousePosition = new EventEmitter<Point>();
   /**
    * configuration change emitter
    * */
   configuration = new EventEmitter<Configuration>();

  /**
   * emit an event on 'onClicked' + interactable.datatype
   **/
  public onClickService(interactable: Interactable, point: Point){
     this['onClicked' + interactable.datatype].emit(interactable);
     if (interactable.datatype != 'Line'){
         this.mousePosition.emit(point);
     }
  }
  /**
   * emit an event on 'onHover' + interactable.datatype
   **/
  public onHoverService(interactable: Interactable, point: Point){
     this['onHovered' + interactable.datatype].emit(interactable);
     if (interactable.datatype != 'Line'){
         this.mousePosition.emit(point);
     }
  }
  /**
   * emit an event on 'offHover' + interactable.datatype
   **/
  public offHoverService(interactable: Interactable){
     this['offHovered' + interactable.datatype].emit(interactable);
     this.mousePosition.emit({visible: false, clientX: -1, clientY: -1, layerX: -1, layerY: -1 });
  }
}
