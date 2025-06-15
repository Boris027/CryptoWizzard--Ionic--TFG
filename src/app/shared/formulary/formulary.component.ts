import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicUser } from 'src/app/core/models/User.model';
import { BACKEND_TOKEN } from 'src/app/core/repositories/repository.tokens';

@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss'],
})
/**
 * Form component that handles user authentication and profile management.
 * Supports three modes controlled by the `type` input:
 * - "login": Form for user login with email and password fields.
 * - "register": Form for new user registration with username, email, password, and gender.
 * - "update": Form to update user information with username, email, and gender.
 * 
 * Emits the form data through the `emitter` output when submitted.
 * 
 * Disables email field when using Firebase backend during update mode.
 */
export class FormularyComponent  implements OnInit {
  Formulary!: FormGroup;
  @Output() emitter:EventEmitter<any> =new EventEmitter<any>()
  @Input() type:string="login"
  @Input() user?:BasicUser
  constructor(
    private fbbuilder: FormBuilder,
    @Inject(BACKEND_TOKEN) public typebackend:string
  ) { }

  /**
   * Initializes the form controls and validators based on the `type` input.
   * Also pre-fills values for update mode and disables email input if using Firebase backend.
   */
  ngOnInit() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(this.type=="register"){
      this.Formulary = this.fbbuilder.group({
        username:['',[Validators.required]],
        email: ['', [Validators.required,Validators.pattern(emailPattern)]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        gender:['',[Validators.required]]
      });
    }else if(this.type=="login"){
      this.Formulary = this.fbbuilder.group({
        email: ['', [Validators.required,Validators.pattern(emailPattern)]],
        password: ['', [Validators.required,Validators.minLength(6)]],
      });
    }else if(this.type=="update"){
      this.Formulary = this.fbbuilder.group({
        username:['',[Validators.required]],
        email: ['', [Validators.required,Validators.pattern(emailPattern)]],
        gender:['',[Validators.required]]
      });
      this.Formulary.get('username')?.setValue(this.user?.username)
      this.Formulary.get('email')?.setValue(this.user?.email)
      this.Formulary.get('gender')?.setValue(this.user?.gender);

      if(this.typebackend=="firebase"){
        this.Formulary.get('email')?.disable()
      }
    }
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  /**
   * Toggles password visibility between 'password' and 'text' input types.
   * Also toggles the password icon.
   */
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /**
   * Getter for the email form control.
   */
  get email(){
    return this.Formulary.controls['email'];
  }

  /**
   * Getter for the password form control.
   */
  get password(){
    return this.Formulary.controls['password'];
  }

  /**
   * Getter for the username form control.
   */
  get username(){
    return this.Formulary.controls['username'];
  }

  /**
   * Getter for the gender form control.
   */
  get gender(){
    return this.Formulary.controls['gender'];
  }

  /**
   * Submits the form and emits an object with the user data depending on the form type.
   * - For "register": emits { username, email, password, gender }
   * - For "login": emits { email, password }
   * - For "update": emits { email, username, gender }
   * 
   * Also resets form states to pristine and untouched after update.
   */
  submitForm(){
    if(this.type=="register"){
      let username:string=this.Formulary.get("username")?.value
      let email:string=this.Formulary.get("email")?.value
      let password:string=this.Formulary.get("password")?.value
      let gender:any=this.Formulary.get("gender")?.value
      let userregister={username:username,email:email,password:password,gender:gender.value}
      this.emitter.emit(userregister)
    }else if(this.type=="login"){
      let email:string=this.Formulary.get("email")?.value
      let password:string=this.Formulary.get("password")?.value
      let userlogin={email:email,password:password}
      this.emitter.emit(userlogin)
    }else if(this.type=="update"){
      let username:string=this.Formulary.get("username")?.value
      let email:string=this.Formulary.get("email")?.value
      let gender:any=this.Formulary.get("gender")?.value
      let userupdate={email:email,username:username,gender:gender.value}
      this.Formulary.markAsPristine();
      this.Formulary.markAsUntouched();
      this.emitter.emit(userupdate)
    }
  }
}