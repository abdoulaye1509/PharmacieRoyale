
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  @Output()
  cb_add_service=new EventEmitter()
  reactiveForm_add_service !: FormGroup;
  submitted:boolean=false
  loading_add_service :boolean=false
  form_details: any = {}
  loading_get_details_add_service_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_service_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_service  = this.formBuilder.group({
          nom_service: ["", Validators.required],
description_service: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_service .controls; }
  // validation du formulaire
  onSubmit_add_service () {
      this.submitted = true;
      console.log(this.reactiveForm_add_service .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_service .invalid) {
          return;
      }
      var service =this.reactiveForm_add_service .value
      this.add_service (service )
  }
  // vider le formulaire
  onReset_add_service () {
      this.submitted = false;
      this.reactiveForm_add_service .reset();
  }
  add_service(service: any) {
      this.loading_add_service = true;
      this.api.taf_post("service/add", service, (reponse: any) => {
      this.loading_add_service = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table service. Réponse= ", reponse);
          this.onReset_add_service()
          alert("Opération éffectuée avec succés")
          this.cb_add_service.emit({
            status:true,
            service:reponse.data
          })
      } else {
          console.log("L'opération sur la table service a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_service = false;
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
