import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreTarea = '';

  constructor( private deseos: DeseosService, private router: ActivatedRoute ) { 
    const listaID = this.router.snapshot.paramMap.get('id');
    console.log(listaID);

    this.lista = this.deseos.obtenerLista( listaID );

    console.log(this.lista);
  }

  nuevaTarea(){

    if ( this.nombreTarea.length == 0 ) {
      return;
    }

    const tarea = new ListaItem( this.nombreTarea );

    this.lista.items.push( tarea );

    this.nombreTarea = '';

    this.deseos.guardarStorage();
  }

  cambiarCheck(tarea: ListaItem){

    const pendientes = this.lista.items.filter( res =>{
      return res.completado == false;
    }).length;

    console.log(pendientes);

    if ( pendientes == 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseos.guardarStorage();

    console.log(this.deseos.listas);

  }

  eliminarTarea( i:number ){

    this.lista.items.splice( i, 1 );

    this.deseos.guardarStorage();

  }

  ngOnInit() {
  }

}
