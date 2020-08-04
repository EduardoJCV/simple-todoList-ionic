import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas:Lista[] = [];

  constructor() {

    this.cargarStorage();
    
   }

   crearLista( titulo:string ){
     const nuevaLista = new Lista(titulo);

     this.listas.push(nuevaLista);

     this.guardarStorage();

     return nuevaLista.id;
   }

   eliminarLista( lista: Lista ){
     this.listas = this.listas.filter( res =>{
       return res.id !== lista.id;
     });

     this.guardarStorage();
   }

   obtenerLista(listaID: string | number){
    const id = Number(listaID);

    return this.listas.find( listaData =>{
      return listaData.id === id;
    });
   }


   guardarStorage(){

    localStorage.setItem('data', JSON.stringify(this.listas));

   }
   cargarStorage(){
    if ( localStorage.getItem('data') ) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
   }
}
