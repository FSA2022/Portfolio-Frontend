import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/LoginUsuario';
import { Nav } from 'src/app/models/nav';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
//login
form: any = {};
  usuario: LoginUsuario | undefined;
  isLogged = false;
  isLoginFail = false;
  //roles: string[] = [];
  errorMsg = '';
//
  navs: Nav[] = [];

  isLogin = false;
  roles: string[] = [];
  authority!: string;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router, private navService: NavService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

    if (this.tokenService.getToken()) {

      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  /*this.cargarNav();*/
  }

  onLogin(): void {

    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.email);
      this.tokenService.setAuthorities(data.authorities);

      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      //alert('Usuario registrado');

      window.location.reload();
      this.router.navigate(['home']);

    },
      (err: any) => {
        this.isLogged = false;
        this.isLoginFail = true;
        alert('Nombre de Usuario o Contraseña incorrectos');
        //this.errorMsg = err.message;
      }
    );
  }

  cargarNav(): void {
    this.navService.lista().subscribe(data => {
      this.navs = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }



  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
    window.location.reload();
  }
}
