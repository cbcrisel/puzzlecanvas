import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomComponent } from './components/room/room.component';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {
    path: 'puzzle',
    component: PuzzleComponent,
    canActivate:[UserGuardGuard]
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
    path:'room',
    component: RoomComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:':game',
    component: GameComponent,
    canActivate:[UserGuardGuard]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
