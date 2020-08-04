import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseos:DeseosService, private router: Router, private alert: AlertController ) {

  }

  async agregarLista() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'nombre de la lista' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () =>{

        }},
        { text: 'Crear', handler: (data) =>{
          const listaID = this.deseos.crearLista(data.titulo);

          this.router.navigateByUrl(`/tabs/tab1/agregar/${listaID}`);
        }}
      ]
    });

    alert.present();
  }


}
