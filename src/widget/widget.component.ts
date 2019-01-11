import { Component, Input, ElementRef, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
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
   * Use the global window.auiEmbeddableWidgets library
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

  constructor(
    private hostRef: ElementRef,
    private zone: NgZone,
    private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // zoid's setInterval causes angular to call detectChanges often on the whole component tree
    // this is a bad thing for performance, so we prevent it from happening
    this.zone.runOutsideAngular(() => {
      // instead we wrap all the event handlers from props so they are run inside the zone
      // which causes detectChanges to be called only after an event handler is run
      const zonedProps = {};
      Object.entries(this.props).forEach(([key, prop]) => {
        zonedProps[key] = this.zonify(prop);
      });
      return this.getLibrary().renderUrl(
        this.widgetUrl, zonedProps, this.hostRef.nativeElement, this.overrides
      );
    }).catch((err) => console.error(err));
  }

  private zonify(prop) {
    const zone = this.zone;
    if (typeof prop === 'function') {
      return function(...args) {
        return zone.run(prop as any, this, args);
      };
    } else {
      return prop;
    }
  }

  private getLibrary(): any {
    if (this.useGlobalLibrary && window['auiEmbeddableWidgets']) {
      return window['auiEmbeddableWidgets'];
    } else {
      return builtinLibrary;
    }
  }

}
