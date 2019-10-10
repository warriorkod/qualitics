import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppGuard } from './guards/is_authentificated';
import { IsAdmin } from './guards/is_admin';
import { SessionService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AppGuard, IsAdmin, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
