import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map, tap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { text } from '@angular/core/src/render3/instructions';

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
  public textControl: FormControl = new FormControl();
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
