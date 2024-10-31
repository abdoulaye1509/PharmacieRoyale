import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent {
  loading_get_produit = false
  les_produits: any[] = []
  selected_produit: any = undefined
  produit_to_edit: any = undefined
  loading_delete_produit = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_produit()
  }
  get_produit() {
    this.loading_get_produit = true;
    this.api.taf_post("produit/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_produits = reponse.data
        console.log("Opération effectuée avec succés sur la table produit. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table produit a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_produit = false;
    }, (error: any) => {
      this.loading_get_produit = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_produits.unshift(event.produit)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_produits[this.les_produits.indexOf(this.produit_to_edit)]=params.new_data
  }
  voir_plus(one_produit: any) {
    this.selected_produit = one_produit
  }
  on_click_edit(one_produit: any) {
    this.produit_to_edit = one_produit
  }
  on_close_modal_edit(){
    this.produit_to_edit=undefined
  }
  delete_produit (produit : any){
    this.loading_delete_produit = true;
    this.api.taf_post("produit/delete", produit,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table produit . Réponse = ",reponse)
        this.get_produit()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table produit  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_produit = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_produit = false;
    })
  }
}