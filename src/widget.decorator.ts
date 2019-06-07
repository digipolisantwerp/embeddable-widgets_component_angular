import * as builtinLibrary from '@acpaas-ui/embeddable-widgets';

declare global {
  interface Window { xprops: any; }
}

/**
 * Decorator to put on components that represent the primary view of an embeddable widget.
 * Ensures that the widget is initialized in the page, and will trigger the auiOnWidgetInit method
 * when the widget is ready passing it the properties received from the container.
 * @param widgetUrl The URL for the widget's definition.
 * @param useGlobalLibrary Whether to use the global window.auiEmbeddableWidgets library
 *                         instead of the one from the app's node_modules.
 */
export function EmbeddableWidget<T extends { new(...args: any[]): {} }>
  ( widgetUrl: string, useGlobalLibrary: boolean = false ): any {

  // implementation derived from:
  // https://netbasal.com/inspiration-for-custom-decorators-in-angular-95aeb87f072c
  // https://stackoverflow.com/a/50466441/20980

  const getLibrary: any = () => {
    if (useGlobalLibrary && window['auiEmbeddableWidgets']) {
      return window['auiEmbeddableWidgets'];
    } else {
      return builtinLibrary;
    }
  };

  return function ( target: T ) {
    let instance = null;
    let initialized = false;

    const doInit = () => {
      if (!initialized) {
        if (instance && instance.auiOnWidgetInit) {
          initialized = true;
          instance.auiOnWidgetInit(window.xprops);
        }
      }
    };

    // create a mixin class for the original class
    // see https://mariusschulz.com/blog/typescript-2-2-mixin-classes#mixins-with-a-constructor
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        instance = this;
        getLibrary().load(widgetUrl).then(doInit);
      }
    };
  };

}
