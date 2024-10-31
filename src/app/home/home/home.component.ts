import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Contact",path:"/home/contact"},
{libelle:"Produit",path:"/home/produit"},
{libelle:"Service",path:"/home/service"}
    ]
  }
}
