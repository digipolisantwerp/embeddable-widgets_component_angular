import { Component, Input } from '@angular/core';
import { EmbeddableWidget } from '../../../../../ngx-embeddable-widgets/src/lib/widget.decorator';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html',
  styleUrls: ['./widget.page.scss'],
})
@EmbeddableWidget('/assets/widget-definition.json')
export class WidgetPage {

  private props: any;

  @Input()
  public subject: string;

  constructor() {
    // this is overridden from definition JSON and from the container example
    this.subject = 'Antwerp';
  }

  public auiOnWidgetInit(props) {
    this.subject = props.subject;
    this.props = props;
  }

  public onClick() {
    if (this.props && this.props.onClick) {
      this.props.onClick();
    }
  }
}
