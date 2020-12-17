import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario/usuario';
import { AuthService } from '../../services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router:Router,private authService:AuthService) { }
  usuario:Usuario=new Usuario();
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado!`,'info');
      this.router.navigate(['/menu']);
    }
  }

  login():void{
    if(this.usuario.username==null || this.usuario.password==null){
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);
      this.authService.guadarUser(response.access_token);
      this.authService.guadarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['menu']);    
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con éxito`, 'success');
    },err =>{
      if(err.status==400){
        Swal.fire('Error Login', 'Username o password incorrectos!', 'error');
      }
    });
  }

}
