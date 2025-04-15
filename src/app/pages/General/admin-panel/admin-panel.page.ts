import { Component, OnInit,Inject } from '@angular/core';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  users = [
    { username: 'Anag', email: 'ana@gmail.com', gender: 'Femenino', isAdmin: true },
    { username: 'Eddar', email: 'eddar@gmail.com', gender: 'Masculino', isAdmin: false },
    { username: 'Eddar', email: 'eddar@gmail.com', gender: 'Masculino', isAdmin: false },
    { username: 'Eddar', email: 'eddar@gmail.com', gender: 'Masculino', isAdmin: false },
    { username: 'Eddar', email: 'eddar@gmail.com', gender: 'Masculino', isAdmin: false },
  ];

  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userService:IUserbaseService<User>
  ){
    this.authservice.setmenu(true)
  }

  ngOnInit() {
    this.userService.AdminDeleteUser("","6yUx0dqxd7U6yMuwl3RoNDmvbv33").subscribe(c=>{
      console.log(c)
    })
  }

  editUser(user: any) {
    console.log('Editar usuario:', user);
    // Aquí puedes navegar a otra página o abrir un modal
  }
  
  deleteUser(user: any) {
    console.log('Eliminar usuario:', user);
    // Aquí puedes abrir una alerta de confirmación
  }
}