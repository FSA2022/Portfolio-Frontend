import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EducacionComponent } from './components/educacion/educacion/educacion.component';

import { GuardService as guard} from './components/guards/guard.service';
import { HomeComponent } from './components/home/home.component';




const routes: Routes = [
 { path: "home", component: HomeComponent },
 //{ path: "login", component: LoginComponent },

  {path: '**', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
