import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import * as builtinLibrary from '@acpaas-ui/embeddable-widgets';

@Component({
  selector: 'aui-embeddable-widget',
  styleUrls: ['./widget.component.scss'],
  template: ''
})
export class EmbeddableWidgetComponent implements AfterViewInit {
  componentName: 'EmbeddableWidget';

  /** The URL of the widget's definition */
  @Input()
  widgetUrl: string;

  /**
   * Use the global window.auiEmbeddedWidgets library
   * instead of the one from the app's node_modules.
   */
  @Input()
  useGlobalLibrary: boolean;

  /** Overrides applied at definition time (once for all widgets of that url) */
  @Input()
  overrides: any;

  /** Props applied at render time */
  @Input()
  props: any;

  constructor(private hostRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.getLibrary().renderUrl(
      this.widgetUrl, this.props, this.hostRef.nativeElement, this.overrides
    ).catch((err) => console.error(err));
  }

  private getLibrary(): any {
    if (this.useGlobalLibrary && window['auiEmbeddedWidgets']) {
      return window['auiEmbeddedWidgets'];
    } else {
      return builtinLibrary;
    }
  }

}
