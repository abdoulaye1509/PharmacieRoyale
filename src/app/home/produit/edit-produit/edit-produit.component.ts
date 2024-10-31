
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent {
  reactiveForm_edit_produit !: FormGroup;
  submitted: boolean = false
  loading_edit_produit: boolean = false
  @Input()
  produit_to_edit: any = {}
  @Output()
  cb_edit_produit=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_produit_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_produit_form()
      this.update_form(this.produit_to_edit)
  }
  // mise à jour du formulaire
  update_form(produit_to_edit:any) {
      this.reactiveForm_edit_produit = this.formBuilder.group({
          nom_produit : [produit_to_edit.nom_produit, Validators.required],
description_produit : [produit_to_edit.description_produit],
prix_unitaire : [produit_to_edit.prix_unitaire],
image_url : [produit_to_edit.image_url]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_produit .controls; }
  // validation du formulaire
  onSubmit_edit_produit() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_produit.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_produit.invalid) {
          return;
      }
      var produit = this.reactiveForm_edit_produit.value
      this.edit_produit({
      condition:JSON.stringify({id_produit:this.produit_to_edit.id_produit}),
      data:JSON.stringify(produit)
      })
  }
  // vider le formulaire
  onReset_edit_produit() {
      this.submitted = false;
      this.reactiveForm_edit_produit.reset();
  }
  edit_produit(produit: any) {
      this.loading_edit_produit = true;
      this.api.taf_post("produit/edit", produit, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_produit.emit({
                  new_data:JSON.parse(produit.data)
              })
              console.log("Opération effectuée avec succés sur la table produit. Réponse= ", reponse);
              this.onReset_edit_produit()
              alert("Opération effectuée avec succés sur la table produit")
          } else {
              console.log("L'opération sur la table produit a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_produit = false;
      }, (error: any) => {
          this.loading_edit_produit = false;
      })
  }
  get_details_add_produit_form() {
      this.loading_get_details_add_produit_form = true;
      this.api.taf_post("produit/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table produit. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table produit a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_produit_form = false;
      }, (error: any) => {
      this.loading_get_details_add_produit_form = false;
    })
  }
}
