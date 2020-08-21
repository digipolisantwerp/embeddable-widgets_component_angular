import {Component, Input, ElementRef, AfterViewInit, NgZone, ChangeDetectorRef, Output, EventEmitter, OnInit} from '@angular/core';
import * as builtinLibraryV1 from '@acpaas-ui/embeddable-widgets-v1';
import * as builtinLibraryV2 from '@acpaas-ui/embeddable-widgets';

@Component({
  selector: 'aui-embeddable-widget',
  styleUrls: ['./widget.component.scss'],
  template: ''
})
export class EmbeddableWidgetComponent implements OnInit, AfterViewInit {
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

  /**
   * Which major release of the embeddable-widgets library to use.
   * Defaults to "2", but "1" can be passed when embedding a v1.0.x widget.
   */
  @Input()
  useLibraryVersion = '2';

  /** Overrides applied at definition time (once for all widgets of that url) */
  @Input()
  overrides: any;

  /** Props applied at render time */
  @Input()
  props: any;

  @Output()
  loaded = new EventEmitter<void | Error>();

  constructor(
    private hostRef: ElementRef,
    private zone: NgZone,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // Detach the change detection, since we won't need it by default
    this.cd.detach();
  }

  ngAfterViewInit(): void {
    // zoid's setInterval causes angular to call detectChanges often on the whole component tree
    // this is a bad thing for performance, so we prevent it from happening
    this.zone.runOutsideAngular(() => {
      // instead we wrap all the event handlers from props so they are run inside the zone
      // which causes detectChanges to be called only after an event handler is run
      const zonedProps = {};
      (Object as any).entries(this.props).forEach(([key, prop]) => {
        zonedProps[key] = this.zonify(prop);
      });
      return this.getLibrary().renderUrl(
        this.widgetUrl, zonedProps, this.hostRef.nativeElement, this.overrides
      );
    })
      .then(() => {
        this.loaded.next();
      })
      .catch(err => {
        this.loaded.next(err);
        console.error(err);
      })
      .finally(() => {
        // Run change detection of this component only once,
        this.cd.detectChanges();
      });
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
      if (this.useLibraryVersion === '1') {
        return builtinLibraryV1;
      } else {
        return builtinLibraryV2;
      }
    }
  }

}
