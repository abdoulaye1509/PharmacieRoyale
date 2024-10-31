import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Login",path:"/public/login"}
    ]
  }
}
