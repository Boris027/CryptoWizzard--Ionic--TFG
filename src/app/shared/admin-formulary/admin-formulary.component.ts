import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BasicUser } from 'src/app/core/models/User.model';

@Component({
  selector: 'app-admin-formulary',
  templateUrl: './admin-formulary.component.html',
  styleUrls: ['./admin-formulary.component.scss'],
})
/**
 * Component for editing basic user data (username, email, gender, isAdmin) within a modal.
 */
export class AdminFormularyComponent  implements OnInit {
  @Input() user?:BasicUser
  public formulary!: FormGroup;

  /**
   * Creates the AdminFormularyComponent and injects required services.
   * 
   * @param modalController Used to control the modal dialog (dismiss/close).
   * @param fb FormBuilder for creating the reactive form.
   */
  constructor(
    private modalController: ModalController,
    private fb:FormBuilder
  ) { }

  /**
   * Lifecycle hook that initializes the form with existing user data if available.
   */
  ngOnInit() {
    this.inicializateformulary()
  }

  /**
   * Closes the modal without passing any data.
   */
  dismissModal() {
    this.modalController.dismiss();
  }

  /**
   * Initializes the form with validators and optionally fills it with the `@Input` user data.
   */
  inicializateformulary(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.formulary=this.fb.group({
      username:['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern(emailPattern)]],
      gender:['',[Validators.required]],
      isAdmin:['',[Validators.required]]
    })
    this.formulary.get('username')?.setValue(this.user?.username)
    this.formulary.get('email')?.setValue(this.user?.email)
    this.formulary.get('gender')?.setValue(this.user?.gender);
    this.formulary.get('isAdmin')?.setValue(this.user?.isAdmin);
  }
  
  /**
   * Submits the form and closes the modal, passing the form values.
   *
   * @returns A promise that resolves after the modal is dismissed with the form data.
   */
  confirm() {
    let data: any
    data = {
      username:this.formulary.controls['username'].value,
      gender:(this.formulary.controls['gender'].value).value,
      isAdmin:this.formulary.controls['isAdmin'].value
    }
    return this.modalController.dismiss(data, 'confirm');
  }

  /**
   * Getter for the `username` form control.
   */
  get username(){
    return this.formulary.controls['username'];
  }

  /**
   * Getter for the `gender` form control.
   */
  get gender(){
    return this.formulary.controls['gender'];
  }

  /**
   * Getter for the `isAdmin` form control.
   */
  get isAdmin() {
    return this.formulary.controls['isAdmin'];
  }
}