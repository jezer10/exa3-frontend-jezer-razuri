import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  productos: any[];
  tipoDoc:any[]=[{iddoc:1,nombre:'Factura'},{iddoc:2,nombre:'Boleta'}]
  carrito: Car[] = new Array();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.listProductos();
    this.formatFecha();
  }

  formatFecha():string{
    let hoy:Date=new Date();
    let formatoFecha:any= `${hoy.getDate()}/${hoy.getMonth()}/${hoy.getUTCFullYear()} ${hoy.getHours()}:${hoy.getMinutes()}`;
    console.log(formatoFecha)
    return formatoFecha;
  }
  listProductos(): void {
    this.productoService.getProductos().subscribe(data => { this.productos = data; console.log(this.productos) });
  }
  addProductoToList(n: number): void {
    for (let e of this.productos) {
      if (e.IDPRODUCTO == n) {
        if(this.carrito.length==0){
          let car = new Car(1, e.IDPRODUCTO, e.NOMPROD, e.PRECIO);
            this.carrito.push(car);
        }else{
          for(let c of this.carrito){
            if(c.idproducto==e.IDPRODUCTO){
              c.cantidad=c.cantidad+1;
              c.importe=c.cantidad*c.precio;
            }else{
              console.log('hola')
            }
          }
        }


      }
    }
  }

  importCalculo(n1: number, n2: number): any {
     let r:any =(n1 * n2).toFixed(2);
    return r;
  }

  importeTotal():number{
    let suma=0;
    for(let c of this.carrito){
      console.log(c.importe)
      suma=suma+c.importe
      console.log(suma)
    }
    return suma;
  }
  importeIGV():number{
    let igv=0;
    igv=this.importeTotal();
    return igv*0.18;
  }



}

export class Car {
  cantidad: number;
  idproducto: number;
  nomprod: String;
  precio: number;
  importe:number;

  constructor(cantidad: number, idproducto: number, nomprod: String, precio: number) {
    this.cantidad = cantidad;
    this.idproducto = idproducto;
    this.nomprod = nomprod;
    this.precio = precio;
    this.importe=this.precio*this.cantidad;
  }
}
