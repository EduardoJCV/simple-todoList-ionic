import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminadas = true;

  constructor( public deseos: DeseosService, private router: Router, private alert: AlertController) { }

  ngOnInit() {}


  goLista(listaID: string | number){
    if (this.terminadas) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${listaID}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${listaID}`);
    }
  }

  eliminarLista( lista: Lista ){
    this.deseos.eliminarLista(lista);
  }

  async editarLista( lista: Lista ) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        { name: 'titulo', type: 'text', value: lista.titulo, placeholder: 'nombre de la lista' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () =>{

        }},
        { text: 'Actualizar', handler: (data) =>{

          this.deseos.listas.map( res =>{
            if ( res.id == lista.id ) {
              console.log(res);
              res.titulo = data.titulo;
            }
            return res;
          });

          this.deseos.guardarStorage();
        }}
      ]
    });

    alert.present();
  }


}
