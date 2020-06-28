import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { UrlService } from '../../provider/url.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  produtos : any;

  constructor(private activatedRoute: ActivatedRoute, public serviceUrl: UrlService, public Http: Http) {
  
    this.listProdutos();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }  
  listProdutos() {
    this.Http.get(this.serviceUrl.getUrl()+"listDados.php").pipe(map(res => res.json()))
    .subscribe(
      listDados => {
        this.produtos = listDados;
        console.log(this.produtos);
      }, err=> {
        console.log(err);
      }
    );
  }
}

