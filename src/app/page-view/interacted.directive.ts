import { Directive, HostListener, Input, ElementRef, OnInit} from '@angular/core';
import { PageViewService } from './page-view.service';
import { Interactable, Word, Line } from './models';
/**
 * This directive informs the {@link /injectables/PageViewService.html|PageViewService} about
 * mouse events on interactable objects and scrolls interactable objects in view if they are 
 * invisible.
 **/
@Directive({
   selector: '[interactedObject]'
})
export class InteractedDirective implements OnInit {
   /**
    * the object of this rect
    **/
   @Input('interactedObject') interactedObject: Interactable;
   /**
    * the identification string of this Interactable's textfield  (e.g. 'first textfield' or 'second textfield')
    **/
   @Input() identity: string = 'first textfield';
   /**
    * the scrollable HTML-container of this Interactable's textfield.
    **/
   @Input() container: HTMLElement;

   constructor(private pageViewService: PageViewService, private el: ElementRef) {}

   /**
    * Subscribe to onHover methods of the {@link /injectables/PageViewService.html|PageViewService}
    * and scroll hovered object in view if it is invisible.
    **/
   ngOnInit(){
      this.interactedObject.textfield_identity = this.identity;
      this.pageViewService.onHoveredWord.subscribe(
         (hoveredWord: Word) => { this.scrollIntoViewIfNeeded(hoveredWord, 'Word')
      });
      this.pageViewService.onHoveredLine.subscribe(
         (hoveredLine: Line) => { this.scrollIntoViewIfNeeded(hoveredLine, 'Line')
      });
   }
   /**
    * Scroll interactable object in view if it is invisible.
    * @param hoveredItem interactable object that is hovered 
    * @param hoveredType string representation of object's type (i.e. 'Word' | 'Line')
    **/
   private scrollIntoViewIfNeeded(hoveredItem: Interactable, hoveredType: String){
      if (hoveredType == 'Word' && this.interactedObject.datatype == 'Word' && this.identity != hoveredItem.textfield_identity){
         let hoveredWord = <Word>hoveredItem
         let currentWord = <Word>this.interactedObject
         if (currentWord.id == hoveredWord.id && currentWord.is_top_object && this.isElementInvisible()){
            this.el.nativeElement.scrollIntoView(true); 
         }
      } else if (hoveredType =='Line' && this.interactedObject.datatype == 'Line'){
         let hoveredLine = <Line>hoveredItem
         let currentLine = <Line>this.interactedObject
         if (currentLine !== hoveredLine && currentLine.id == hoveredLine.id && this.isElementInvisible()){
            this.el.nativeElement.scrollIntoView(true); 
         }
      }
   }
   /**
    * Return whether interactable object is invisible, i.e. whether it is outside of
    * its scrollable container's viewport.
    **/
   private isElementInvisible(): boolean {
      if (this.container == null || this.container == undefined || this.container.getAttribute('class') == 'inline'){
         return false;
      }
      let myRect: DOMRect = <DOMRect>this.el.nativeElement.getBoundingClientRect(); 
      let containerRect: DOMRect = <DOMRect>this.container.getBoundingClientRect();
      return myRect.top < containerRect.top 
         || myRect.bottom > containerRect.bottom
         || myRect.left < containerRect.left
         || myRect.right > containerRect.right;
   }
   /**
    * informs the {@link /injectables/PageViewService.html|PageViewService} about
    * click events on {@link #interactedObject|interactedObject}.
    **/
   @HostListener('click', ['$event']) onMouseClick( e: MouseEvent) {
      this.pageViewService.onClickService(this.interactedObject, { visible: true, layerX: e.layerX, layerY: e.layerY, clientX: e.clientX, clientY: e.clientY });
   }
   /**
    * informs the {@link /injectables/PageViewService.html|PageViewService} about
    * mouse enter events on {@link #interactedObject|interactedObject}.
    **/
   @HostListener('mouseenter', ['$event']) onMouseEnter( e: MouseEvent) {
      this.pageViewService.onHoverService(this.interactedObject, { visible: true, layerX: e.layerX, layerY: e.layerY, clientX: e.clientX, clientY: e.clientY });
   }
   /**
    * informs the {@link /injectables/PageViewService.html|PageViewService} about
    * mouse leave events on {@link #interactedObject|interactedObject}.
    **/
   @HostListener('mouseleave') onMouseLeave() {
     this.pageViewService.offHoverService(this.interactedObject);
   }
}
