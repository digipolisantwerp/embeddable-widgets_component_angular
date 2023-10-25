import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-container',
  templateUrl: './container.page.html',
})
export class ContainerPage implements OnInit {

  constructor() {
    // make sure "this" works when called from zoid
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  public text$: BehaviorSubject<string>;
  public textControl: UntypedFormControl = new UntypedFormControl();
  public props$: Observable<any>;

  // the number of times the button is clicked inside the widget
  public clicks = 0;

  ngOnInit() {
    this.text$ = new BehaviorSubject<string>('World');
    this.props$ = this.text$.pipe(
      distinctUntilChanged(),
      map((t) => ({ subject: t, onClick: this.onButtonClicked })),
      shareReplay(1)
    );
  }

  public onButtonClicked() {
    this.clicks++;
  }

  public onTextChange(e) {
    this.text$.next(e.target.value);
  }

  onLoad(error?) {
    console.log(`Widget loaded ${error ? 'with' : 'without'} error!`);
  }
}
