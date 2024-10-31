
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  reactiveForm_edit_service !: FormGroup;
  submitted: boolean = false
  loading_edit_service: boolean = false
  @Input()
  service_to_edit: any = {}
  @Output()
  cb_edit_service=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_service_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_service_form()
      this.update_form(this.service_to_edit)
  }
  // mise à jour du formulaire
  update_form(service_to_edit:any) {
      this.reactiveForm_edit_service = this.formBuilder.group({
          nom_service : [service_to_edit.nom_service, Validators.required],
description_service : [service_to_edit.description_service]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_service .controls; }
  // validation du formulaire
  onSubmit_edit_service() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_service.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_service.invalid) {
          return;
      }
      var service = this.reactiveForm_edit_service.value
      this.edit_service({
      condition:JSON.stringify({id_service:this.service_to_edit.id_service}),
      data:JSON.stringify(service)
      })
  }
  // vider le formulaire
  onReset_edit_service() {
      this.submitted = false;
      this.reactiveForm_edit_service.reset();
  }
  edit_service(service: any) {
      this.loading_edit_service = true;
      this.api.taf_post("service/edit", service, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_service.emit({
                  new_data:JSON.parse(service.data)
              })
              console.log("Opération effectuée avec succés sur la table service. Réponse= ", reponse);
              this.onReset_edit_service()
              alert("Opération effectuée avec succés sur la table service")
          } else {
              console.log("L'opération sur la table service a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_service = false;
      }, (error: any) => {
          this.loading_edit_service = false;
      })
  }
  get_details_add_service_form() {
      this.loading_get_details_add_service_form = true;
      this.api.taf_post("service/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table service. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table service a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_service_form = false;
      }, (error: any) => {
      this.loading_get_details_add_service_form = false;
    })
  }
}
