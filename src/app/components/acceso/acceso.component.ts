import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  accesos:any[];
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    let usuario=JSON.parse(sessionStorage.usuario);
    this.accesos=usuario.accesos;
    console.log(this.accesos)
  }
  autenticado():boolean{
    let usuario=JSON.parse(sessionStorage.usuario);
    this.accesos=usuario.accesos;
    return this.authService.isAuthenticated();
    
  }
  cerrarSesion():void{
    this.authService.logout();
  }

}
