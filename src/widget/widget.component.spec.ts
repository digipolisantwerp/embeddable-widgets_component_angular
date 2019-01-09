import { TestBed } from '@angular/core/testing';
import { EmbeddableWidgetsModule } from '..';
import { EmbeddableWidgetComponent } from './widget.component';

describe('Embeddable widget', () => {

  let fixture = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmbeddableWidgetsModule]
    });
    fixture = TestBed.createComponent(EmbeddableWidgetComponent);
  });

  afterEach(() => {
    if (fixture && fixture.nativeElement) {
      document.body.removeChild(fixture.nativeElement);
    }
    fixture = null;
  });

  it('should create an instance of EmbeddableWidgetComponent', () => {
    expect(fixture).toBeTruthy();
  });

});
