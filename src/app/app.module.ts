import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NUMBER_OF_SCORES } from './tokens/number-of-scores.token';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide: NUMBER_OF_SCORES, useValue: 10 }],
  bootstrap: [AppComponent],
})
export class AppModule {}
