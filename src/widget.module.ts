import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbeddableWidgetComponent } from './widget/widget.component';
import { WindowRef } from './helpers/windowRef.service';

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
  providers: [WindowRef],
})
export class EmbeddableWidgetsModule { }

export * from './widget.decorator';
