import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/LoginUsuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: any = {};
  usuario: LoginUsuario | undefined;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';
  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {

      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }else{
    alert('Debes iniciar sesion para ver mi PortFolio\nPuedes ingresar usando los siguientes datos:\nUsuario = user | Password = user');


    }}

}
