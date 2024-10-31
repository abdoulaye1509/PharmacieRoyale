
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent {
  @Output()
  cb_add_produit=new EventEmitter()
  reactiveForm_add_produit !: FormGroup;
  submitted:boolean=false
  loading_add_produit :boolean=false
  form_details: any = {}
  loading_get_details_add_produit_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_produit_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_produit  = this.formBuilder.group({
          nom_produit: ["", Validators.required],
description_produit: [""],
prix_unitaire: [""],
image_url: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_produit .controls; }
  // validation du formulaire
  onSubmit_add_produit () {
      this.submitted = true;
      console.log(this.reactiveForm_add_produit .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_produit .invalid) {
          return;
      }
      var produit =this.reactiveForm_add_produit .value
      this.add_produit (produit )
  }
  // vider le formulaire
  onReset_add_produit () {
      this.submitted = false;
      this.reactiveForm_add_produit .reset();
  }
  add_produit(produit: any) {
      this.loading_add_produit = true;
      this.api.taf_post("produit/add", produit, (reponse: any) => {
      this.loading_add_produit = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table produit. Réponse= ", reponse);
          this.onReset_add_produit()
          alert("Opération éffectuée avec succés")
          this.cb_add_produit.emit({
            status:true,
            produit:reponse.data
          })
      } else {
          console.log("L'opération sur la table produit a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_produit = false;
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
