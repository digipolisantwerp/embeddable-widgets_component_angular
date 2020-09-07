import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmbeddableWidgetsModule } from '../../src';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Pages } from './pages';

@NgModule({
  imports: [
    BrowserModule,
    EmbeddableWidgetsModule,
    AppRoutingModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    ...Pages,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
