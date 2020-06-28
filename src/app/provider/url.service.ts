import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

   url: string = "http://localhost/catalogo_produtos/php/";

  constructor(public alert: AlertController) { }

  getUrl(){

       return this.url;

  }

  async alertas(titulo,msg){
    const alert = await this.alert.create({
      header: titulo,
      message: msg,
      buttons: [
        'OK'
      ]
    });
     await alert.present();
  }
}
