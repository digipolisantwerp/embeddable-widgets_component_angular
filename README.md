# Embeddable Widgets Component (Angular)

This is an Angular component and decorator that wraps the [ACPaaS UI Embeddable Widgets framework](https://example.com/TODO).

For more information on what embeddable widgets are see the link above.

There is a demo app, see below for instructions on running it.

## How to use

### Installing

```sh
> npm install @acpaas-ui/embeddable-widgets @acpaas-ui/ngx-embeddable-widgets
```

### Embedding a widget

Import the component in your module:

```ts
import { EmbeddableWidgetsModule } from '@acpaas-ui/ngx-embeddable-widgets';

@NgModule({
  imports: [
    ...,
    EmbeddableWidgetsModule
  ],
  ...
})
```

In your template:

```html
<aui-embeddable-widget 
  widgetUrl="//example.com/widget/definition.json"
  [props]="{ someProp: 'value' }">
</aui-embeddable-widget>
```

Supported attributes:

- widgetUrl: the URL of the widget's JSON definition (required)
- props: the props to pass to the embedded widget
- overrides: overrides to specify when the widget definition is loaded (only applied once per loaded tag)
- useGlobalLibrary: if true, uses window.auiEmbeddableWidgets instead of @acpaas-ui/embeddable-widgets

There are no events, since all event handlers are specified in props. To understand how to do this, look at the `onClick` event inside the `example` folder.

### Publishing a widget

Create a page in your angular app that contains the widget.

Publish a JSON definition for your widget. For example, you can include a file `widget-definition.json` in the assets folder. See `example/assets/widget-definition.json` for an example.

Decorate the page's component:

```ts
import { EmbeddableWidget } from '@acpaas-ui/ngx-embeddable-widgets';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html'
})
@EmbeddableWidget('/assets/widget-definition.json')
export class WidgetPage {
// ...

  public auiOnWidgetInit(props) {
    // initialize from props here
  }
```

This will do the following:

- Initialize the current page as the widget defined in the JSON.
- Call the `auiOnWidgetInit` method and pass it the `props` specified from the container app.

## Run the demo app

```sh
> npm install
> npm start
```

Browse to [localhost:4200](http://localhost:4200)

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## License

This project is published under the [MIT license](LICENSE.md).
