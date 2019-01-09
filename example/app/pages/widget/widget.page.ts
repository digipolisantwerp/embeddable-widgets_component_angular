import { Component } from '@angular/core';
import { EmbeddableWidget } from '../../../../src/widget.decorator';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html',
})
@EmbeddableWidget('/assets/widget-definition.json')
export class WidgetPage { }
