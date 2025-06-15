import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BasicList } from 'src/app/core/models/CryptoList.model';

@Component({
  selector: 'app-listformulary',
  templateUrl: './listformulary.component.html',
  styleUrls: ['./listformulary.component.scss'],
})
/**
 * Modal form component for creating or updating a cryptocurrency list.
 * 
 * Supports two modes controlled by `updateOrCreate` input:
 * - "Create": initializes an empty form for a new list.
 * - "Update": pre-fills the form with the data of an existing list.
 * 
 * On confirmation, dismisses the modal passing back the list data.
 */
export class ListformularyComponent  implements OnInit {
  @Input() list?:BasicList
  @Input() updateOrCreate?:string="Create"
  public Formulary!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb:FormBuilder
  ) { }

  /**
   * Initializes the form on component initialization.
   */
  ngOnInit() {
    this.inicializateformulary()
  }

  /**
   * Dismisses the modal without returning any data.
   */

  dismissModal() {
    this.modalController.dismiss();
  }

  /**
   * Initializes the reactive form controls based on mode.
   * In "Create" mode, form is empty.
   * In "Update" mode, form is pre-filled with existing list values.
   */
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

  /**
   * Confirms the form submission and dismisses the modal passing back
   * the form data as a BasicList object.
   * @returns Promise that resolves when the modal is dismissed
   */
  confirm() {
    let data:BasicList
    data={
      id:(this.list)?this.list.id:0+"",
      title:this.Formulary.controls['Title'].value,
      description:this.Formulary.controls['Description'].value
    }
    return this.modalController.dismiss(data, 'confirm');
  }

  /**
   * Getter for the Title form control.
   */
  get Title():AbstractControl | null{
    return this.Formulary!.get("Title")
  }

  /**
   * Getter for the Description form control.
   */
  get Description():AbstractControl | null{
    return this.Formulary!.get("Description")
  }
}