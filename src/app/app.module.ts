import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ExperienciaComponent } from './components/experiencia/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion/educacion.component';
import { HardAndSoftSkillComponent } from './components/hard-and-soft-skill/hard-and-soft-skill/hard-and-soft-skill.component';
import { ProyectoComponent } from './components/proyecto/proyecto/proyecto.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { interceptorProvider } from './components/interceptors/auth-interceptor-service.service';
import { UserComponent } from './components/users/user.component';
import { AdminComponent } from './components/users/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ExperienciaComponent,
    EducacionComponent,
    HardAndSoftSkillComponent,
    ProyectoComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    UserComponent,
    AdminComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
