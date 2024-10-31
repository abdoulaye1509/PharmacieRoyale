import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {
  loading_get_contact = false
  les_contacts: any[] = []
  selected_contact: any = undefined
  contact_to_edit: any = undefined
  loading_delete_contact = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_contact()
  }
  get_contact() {
    this.loading_get_contact = true;
    this.api.taf_post("contact/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_contacts = reponse.data
        console.log("Opération effectuée avec succés sur la table contact. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table contact a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_contact = false;
    }, (error: any) => {
      this.loading_get_contact = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_contacts.unshift(event.contact)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_contacts[this.les_contacts.indexOf(this.contact_to_edit)]=params.new_data
  }
  voir_plus(one_contact: any) {
    this.selected_contact = one_contact
  }
  on_click_edit(one_contact: any) {
    this.contact_to_edit = one_contact
  }
  on_close_modal_edit(){
    this.contact_to_edit=undefined
  }
  delete_contact (contact : any){
    this.loading_delete_contact = true;
    this.api.taf_post("contact/delete", contact,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table contact . Réponse = ",reponse)
        this.get_contact()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table contact  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_contact = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_contact = false;
    })
  }
}