import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {
  query:{
  
    nameRoom:localStorage.getItem('room')
  }
} };


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoomComponent } from './components/room/room.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
