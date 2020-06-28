import { UrlService } from './../../provider/url.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import  { Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

email : string;
senha: string;


  constructor(public alert: AlertController, public UrlService: UrlService, public http: Http,
     public nav: NavController, public loading: LoadingController) {

      this.email = "diogo.viegas@gmail.com";
      this.senha= '123';

      }

  ngOnInit() {
  }

  async logar(){ 

    if(this.email == undefined || this.senha == undefined) {

      this.UrlService.alertas('Atenção','Preencha todos os campos!');

     } else { 
     const load = await this.loading.create({
       spinner: 'dots',
       message: 'Verificando login...'
     });  
     await load.present(); 
  
  this.http.get(this.UrlService.getUrl()+"Login.php?email="+this.email+"&senha="+this.senha).pipe(map(res => 
    res.json()))
    .subscribe(

      data => {
        if (data.msg.logado=="sim") {
          if(data.dados.status =="Ativo") { 
            load.dismiss();
            this.nav.navigateBack('folder/Inbox');
          }else {
            load.dismiss();
            this.UrlService.alertas('Atençao','Usuário bloqueado!');

          }
           
          
        } else {
            load.dismiss();
            this.UrlService.alertas('Atenção','Usuário ou senha incorretos!')

        }

      }
    );

   }

 }

}
