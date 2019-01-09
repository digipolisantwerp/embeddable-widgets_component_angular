import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.page.html',
})
export class ContainerPage {

  constructor() {
    // make sure "this" works when called from zoid
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  // the number of times the button is clicked inside the widget
  public clicks = 0;

  public onButtonClicked() {
    this.clicks++;
  }
}
