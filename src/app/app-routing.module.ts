import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {
    path: 'puzzle',
    component: PuzzleComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path:':room',
    component: RoomComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {path: '**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
