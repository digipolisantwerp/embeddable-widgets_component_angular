import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmbeddableWidgetsModule } from '../../../ngx-embeddable-widgets/src/lib/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Pages } from './pages/index';

@NgModule({
  imports: [
    BrowserModule,
    EmbeddableWidgetsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ...Pages,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
