import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideocallComponent } from './videocall/videocall.component';
import { HomeComponent } from './home/home.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';

@NgModule({
  declarations: [
    AppComponent,
    VideocallComponent,
    HomeComponent,
    InvalidPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
