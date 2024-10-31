import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent {
  loading_get_service = false
  les_services: any[] = []
  selected_service: any = undefined
  service_to_edit: any = undefined
  loading_delete_service = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_service()
  }
  get_service() {
    this.loading_get_service = true;
    this.api.taf_post("service/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_services = reponse.data
        console.log("Opération effectuée avec succés sur la table service. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table service a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_service = false;
    }, (error: any) => {
      this.loading_get_service = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_services.unshift(event.service)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_services[this.les_services.indexOf(this.service_to_edit)]=params.new_data
  }
  voir_plus(one_service: any) {
    this.selected_service = one_service
  }
  on_click_edit(one_service: any) {
    this.service_to_edit = one_service
  }
  on_close_modal_edit(){
    this.service_to_edit=undefined
  }
  delete_service (service : any){
    this.loading_delete_service = true;
    this.api.taf_post("service/delete", service,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table service . Réponse = ",reponse)
        this.get_service()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table service  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_service = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_service = false;
    })
  }
}