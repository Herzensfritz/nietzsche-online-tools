# PageViewModule

## How to use PageViewComponent

This component displays one or two images with word hovers and corresponding lines in `TextFieldComponent(s)` and `MarginFieldComponent(s)`.

On more information about this module see the documentation.

### Import Module

In your Angular module file, e.g. `app.module.ts`:

```
import { PageViewModule} from './page-view/page-view.module';
import { PageViewService } from './page-view/page-view.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ PageViewModule ],
  providers: [ PageViewService ],
  .
  .
  .
```

### In your template:

```
<page-view [assignClass]="assignClass" [assignStyle]="assignStyle" [findText]="findText"
           [configuration]="configuration"
           [first_image]="image" [first_lines]="lines" [first_words]="words" 
           [first_foreign_texts]="foreignTexts" [second_foreign_texts]="second_foreignTexts"
           [second_image]="second_image" [second_lines]="second_lines" [second_words]="second_words" 
           [selectedWords]="selectedWords" [selectedLines]="selectedLines"
           [preferPrimaryUrl]="true" [zoomFactor]="zoomFactor"></page-view>

```

List of inputs:

- `assignClass`: 

         An OPTIONAL function that will be passed to `TextFieldComponent`
         in order to return a further highlight class
         to the word rects when the internal function would return 'textfield unhighlighted'

- `assignStyle`:

         An OPTIONAL function that will be passed to `TextFieldComponent` and `MarginFieldComponent`
         in order to return a (svg-)style object
         to the word and line rects. This function allows the user to extend the style of this component.
         E.g. by returning { fill: blue } the function overwrites the default behaviour and sets
         the default highlight color to blue.

- `configuration`: OPTIONAL configuration in the form `{'ComponentName|*': { 'PropertyName': value }}`

- `findText`: OPTIONAL the search text of words that should be highlighted.

- `first_foreign_texts`: text by foreign hand belonging to first image 

- `first_image`: the first image that will be displayed

- `first_lines`: the Array of lines of the first image that will be displayed

- `first_words`: the Array of words of the first image that will be displayed

- `max_height`: OPTIONAL the (initial) maximum height of the image(s)

- `preferPrimaryUrl`: OPTIONAL should primary Url be used for image. Use secondary Url if false. Default: true.

- `second_foreign_texts`: text by foreign hand belonging to second image 

- `second_image`: OPTIONAL the second image that will be displayed

- `second_lines`: OPTIONAL the Array of lines of the second image that will be displayed

- `second_words`: OPTIONAL the Array of words of the second image that will be displayed

- `selectedWords`: OPTIONAL identifiers of selected words that should be highlighted (i.e. list of IRIs or Ids).

- `selectedLines`: OPTIONAL identifiers of selected words that should be highlighted (i.e. list of IRIs or Ids).

- `zoomFactor`: OPTIONAL global zoom factor

### For your Data

Use the interfaces from `pageView/models.ts` for your data:

```
import { externalAssignClass, externalAssignStyle, Image, PositionalObject, TextField, TextByForeignHand, Line, Word } from './page-view/models';
```

### For mouse event interaction

Use the `PageViewService` in order to react on mouse events.

Import:

```
import { PageViewService } from './page-view/page-view.service';
```

Inject service:

```
constructor(private pageViewService: PageViewService) {}
```

Subscribe to mouse events on words and lines:

```
ngOnInit() {
   this.pageViewService.onClickedWord.subscribe(
      (clickedWord: Word) => { this.doSomething(clickedWord); }
   );
   this.pageViewService.onClickedLine.subscribe(
      (clickedLine: Line) => { this.doSomething(clickedLine); }
   );
   this.pageViewService.onHoveredWord.subscribe(
      (hoveredWord: Word) => { this.doSomething(hoveredWord); }
   );
   this.pageViewService.onHoveredLine.subscribe(
      (hoveredLine: Line) => { this.doSomething(hoveredLine); }
   );
   this.pageViewService.offHoveredWord.subscribe(
      (unhoveredWord: Word) => { this.doSomething(unhoveredWord); }
   );
   this.pageViewService.offHoveredLine.subscribe(
      (unhoveredLine: Line) => { this.doSomething(unhoveredLine); }
   );
}
```

