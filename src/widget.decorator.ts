import 'reflect-metadata';
import * as builtinLibraryV2 from '@acpaas-ui/embeddable-widgets';
import * as builtinLibraryV1 from '@acpaas-ui/embeddable-widgets-v1';
import {IWidget} from '../../../../frontend/src/app/pages/widgets/widgets';

declare global {
  interface Window {
    xprops: any;
  }
}

/**
 * Decorator to put on components that represent the primary view of an embeddable widget.
 * Ensures that the widget is initialized in the page, and will trigger the auiOnWidgetInit method
 * when the widget is ready passing it the properties received from the container.
 * @param widgetUrl The URL for the widget's definition.
 * @param useGlobalLibrary Whether to use the global window.auiEmbeddableWidgets library
 *                         instead of the one from the app's node_modules.
 */
export function EmbeddableWidget<K, T extends { new(...args: any[]): IWidget<K> }>
(widgetUrl: string, useGlobalLibrary: boolean = false): any {

  // implementation derived from:
  // https://netbasal.com/inspiration-for-custom-decorators-in-angular-95aeb87f072c
  // https://stackoverflow.com/a/50466441/20980

  const getLibrary: any = () => {
    if (useGlobalLibrary && window['auiEmbeddableWidgets']) {
      return window['auiEmbeddableWidgets'];
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const version = urlParams.get('_aui_api_version');
      if (version === '1') {
        return builtinLibraryV1;
      } else {
        return builtinLibraryV2;
      }
    }
  };

  return function (target: T) {
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

    const getParamTypesAndParameters = () => {
      const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
      const rawParameters = Reflect.getMetadata('parameters', target);
      const parameters = Array(paramTypes.length).fill(null);
      if (rawParameters) {
        rawParameters.slice(0, paramTypes.length).forEach((el, i) => {
          parameters[i] = el;
        });
      }
      return [paramTypes, parameters];
    };

    // create a mixin class for the original class
    // see https://mariusschulz.com/blog/typescript-2-2-mixin-classes#mixins-with-a-constructor
    const Widget = class extends target {
      constructor(...args: any[]) {
        super(...args);
        instance = this;
        getLibrary().load(widgetUrl).then(doInit);
      }
    };

    // add metadata so angular can figure out how to inject dependencies
    // adapted from https://medium.com/@artsiomkuts/typescript-mixins-with-angular2-di-671a9b159d47
    const [parentParamTypes, parentParameters] = getParamTypesAndParameters();
    Reflect.defineMetadata('design:paramtypes', parentParamTypes, Widget);
    Reflect.defineMetadata('parameters', parentParameters, Widget);
    Reflect.defineMetadata('parentParameters', parentParameters, Widget);

    return Widget;
  };

}
