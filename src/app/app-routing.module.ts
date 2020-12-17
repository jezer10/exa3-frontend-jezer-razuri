import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarVentasComponent } from './components/listar-ventas/listar-ventas.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { AuthRouteGuard } from './guards/auth/auth-route.guard';
import { RolGuard } from './guards/rol/rol.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'producto',component:ProductoComponent,canActivate:[AuthRouteGuard,RolGuard],data:{role:'ADMIN'}},
  {path:'listarventas',component:ListarVentasComponent},
  {path:'menu',component:HomeComponent},
  {path:'ventas',component:VentasComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
