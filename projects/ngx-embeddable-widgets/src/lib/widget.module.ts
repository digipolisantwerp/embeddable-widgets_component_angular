import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbeddableWidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    EmbeddableWidgetComponent,
  ],
  declarations: [
    EmbeddableWidgetComponent,
  ],
  providers: [],
})
export class EmbeddableWidgetsModule { }

export * from './widget.decorator';
