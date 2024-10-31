
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  reactiveForm_edit_contact !: FormGroup;
  submitted: boolean = false
  loading_edit_contact: boolean = false
  @Input()
  contact_to_edit: any = {}
  @Output()
  cb_edit_contact=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_contact_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_contact_form()
      this.update_form(this.contact_to_edit)
  }
  // mise à jour du formulaire
  update_form(contact_to_edit:any) {
      this.reactiveForm_edit_contact = this.formBuilder.group({
          nom_contact : [contact_to_edit.nom_contact, Validators.required],
email : [contact_to_edit.email, Validators.required],
telephone : [contact_to_edit.telephone],
message : [contact_to_edit.message, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_contact .controls; }
  // validation du formulaire
  onSubmit_edit_contact() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_contact.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_contact.invalid) {
          return;
      }
      var contact = this.reactiveForm_edit_contact.value
      this.edit_contact({
      condition:JSON.stringify({id_contact:this.contact_to_edit.id_contact}),
      data:JSON.stringify(contact)
      })
  }
  // vider le formulaire
  onReset_edit_contact() {
      this.submitted = false;
      this.reactiveForm_edit_contact.reset();
  }
  edit_contact(contact: any) {
      this.loading_edit_contact = true;
      this.api.taf_post("contact/edit", contact, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_contact.emit({
                  new_data:JSON.parse(contact.data)
              })
              console.log("Opération effectuée avec succés sur la table contact. Réponse= ", reponse);
              this.onReset_edit_contact()
              alert("Opération effectuée avec succés sur la table contact")
          } else {
              console.log("L'opération sur la table contact a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_contact = false;
      }, (error: any) => {
          this.loading_edit_contact = false;
      })
  }
  get_details_add_contact_form() {
      this.loading_get_details_add_contact_form = true;
      this.api.taf_post("contact/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table contact. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table contact a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_contact_form = false;
      }, (error: any) => {
      this.loading_get_details_add_contact_form = false;
    })
  }
}
