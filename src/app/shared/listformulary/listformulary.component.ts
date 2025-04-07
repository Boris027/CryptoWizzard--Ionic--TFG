import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { BasicList } from 'src/app/core/models/CryptoList.model';

@Component({
  selector: 'app-listformulary',
  templateUrl: './listformulary.component.html',
  styleUrls: ['./listformulary.component.scss'],
})
export class ListformularyComponent  implements OnInit {

  @Input() list?:BasicList
  @Input() updateOrCreate?:string="Create"
  public Formulary!: FormGroup;


  constructor(
    private modalController: ModalController,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.inicializateformulary()
  }

  dismissModal() {
    this.modalController.dismiss();  // Esto cierra el modal
  }

  inicializateformulary(){
    if(this.updateOrCreate=='Create'){
      this.Formulary=this.fb.group({
        Title:["",[Validators.required,Validators.minLength(3)]],
        Description:["",[Validators.required,Validators.minLength(6)]],
      }
    )}
    else if(this.updateOrCreate=='Update'){
      this.Formulary=this.fb.group({
        Title:["",[Validators.required,Validators.minLength(3)]],
        Description:["",[Validators.required,Validators.minLength(6)]],
      })
      this.Formulary.get('Title')?.setValue(this.list?.title)
      this.Formulary.get('Description')?.setValue(this.list?.description)

    }

  }

  confirm() {
    let data:BasicList
    data={
      id:(this.list)?this.list.id:0+"",
      title:this.Formulary.controls['Title'].value,
      description:this.Formulary.controls['Description'].value
    }
    

    return this.modalController.dismiss(data, 'confirm');
  }

  get Title():AbstractControl | null{
    return this.Formulary!.get("Title")
  }
  get Description():AbstractControl | null{
    return this.Formulary!.get("Description")
  }
  

}
