import { ThrowStmt } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  accesos: any[];
  constructor(private authService: AuthService,private route:Router) { }

  ngOnInit(): void {

  }
  autenticado(): boolean {
    if (this.authService.isAuthenticated()) {
      let usuario = JSON.parse(sessionStorage.usuario);
      this.accesos = usuario.accesos;
      return true
    }

  }
  cerrarSesion(): void {
    this.authService.logout();
    this.route.navigate(['/login'])
  }

}
