import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BasicUser } from 'src/app/core/models/User.model';

@Component({
  selector: 'app-admin-formulary',
  templateUrl: './admin-formulary.component.html',
  styleUrls: ['./admin-formulary.component.scss'],
})
export class AdminFormularyComponent  implements OnInit {
  @Input() user?:BasicUser
  public formulary!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.inicializateformulary()
  }

  dismissModal() {
    this.modalController.dismiss();
  }

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
  
  confirm() {
    let data: any
    data = {
      username:this.formulary.controls['username'].value,
      gender:(this.formulary.controls['gender'].value).value,
      isAdmin:this.formulary.controls['isAdmin'].value
    }
    
    return this.modalController.dismiss(data, 'confirm');
  }

  get username(){
    return this.formulary.controls['username'];
  }

  get gender(){
    return this.formulary.controls['gender'];
  }

  get isAdmin() {
    return this.formulary.controls['isAdmin'];
  }
}