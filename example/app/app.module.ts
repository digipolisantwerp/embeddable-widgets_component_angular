import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmbeddableWidgetsModule } from '../../src';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Pages } from './pages';

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
