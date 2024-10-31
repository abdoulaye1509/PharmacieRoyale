
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  @Output()
  cb_add_contact=new EventEmitter()
  reactiveForm_add_contact !: FormGroup;
  submitted:boolean=false
  loading_add_contact :boolean=false
  form_details: any = {}
  loading_get_details_add_contact_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_contact_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_contact  = this.formBuilder.group({
          nom_contact: ["", Validators.required],
email: ["", Validators.required],
telephone: [""],
message: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_contact .controls; }
  // validation du formulaire
  onSubmit_add_contact () {
      this.submitted = true;
      console.log(this.reactiveForm_add_contact .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_contact .invalid) {
          return;
      }
      var contact =this.reactiveForm_add_contact .value
      this.add_contact (contact )
  }
  // vider le formulaire
  onReset_add_contact () {
      this.submitted = false;
      this.reactiveForm_add_contact .reset();
  }
  add_contact(contact: any) {
      this.loading_add_contact = true;
      this.api.taf_post("contact/add", contact, (reponse: any) => {
      this.loading_add_contact = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table contact. Réponse= ", reponse);
          this.onReset_add_contact()
          alert("Opération éffectuée avec succés")
          this.cb_add_contact.emit({
            status:true,
            contact:reponse.data
          })
      } else {
          console.log("L'opération sur la table contact a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_contact = false;
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
