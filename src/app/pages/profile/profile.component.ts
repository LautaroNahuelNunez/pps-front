import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from '../../edit-profile-modal/edit-profile-modal.component';
import { LoginService } from './../../services/login.service';
import { UserService } from './../../services/user.service'; // Importar UserService
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  userRole: string = '';

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    private userService: UserService // Inyectar UserService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log('User data:', this.user);
    
    // Transformar el rol del usuario
    if (this.user && this.user.authorities && this.user.authorities.length > 0) {
      this.userRole = this.transformRole(this.user.authorities[0].authority);
    }
  }

  transformRole(role: string): string {
    switch (role) {
      case 'NORMAL':
        return 'Usuario Regular'; // Aquí puedes poner el texto que desees
      case 'ADMIN':
        return 'Administrador'; // Otro ejemplo
      default:
        return role; // Si no coincide con ninguno, se muestra el rol tal cual
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '250px',
      data: { nombre: this.user.nombre, apellido: this.user.apellido, telefono: this.user.telefono }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.nombre = result.nombre;
        this.user.apellido = result.apellido;
        this.user.telefono = result.telefono;
        // Llamar a userService.updateUser en lugar de loginService.updateUser
        this.userService.updateUser(this.user).subscribe(
          (data) => {
            console.log('Perfil actualizado', data);
          },
          (error) => {
            console.log('Error al actualizar perfil', error);
          }
        );
      }
    });
  }
}




/* import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from '../../edit-profile-modal/edit-profile-modal.component';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  userRole: string = '';

  constructor(private loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log('User data:', this.user);
    
    // Transformar el rol del usuario
    if (this.user && this.user.authorities && this.user.authorities.length > 0) {
      this.userRole = this.transformRole(this.user.authorities[0].authority);
    }
  }

  transformRole(role: string): string {
    switch (role) {
      case 'NORMAL':
        return 'Usuario Regular'; // Aquí puedes poner el texto que desees
      case 'ADMIN':
        return 'Administrador'; // Otro ejemplo
      default:
        return role; // Si no coincide con ninguno, se muestra el rol tal cual
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '250px',
      data: { nombre: this.user.nombre, apellido: this.user.apellido, telefono: this.user.telefono }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.nombre = result.nombre;
        this.user.apellido = result.apellido;
        this.user.telefono = result.telefono;
        //Aquí puedes llamar a tu servicio para actualizar los datos en el backend
        this.loginService.updateUser(this.user).subscribe(
          (data) => {
            console.log('Perfil actualizado', data);
          },
          (error) => {
            console.log('Error al actualizar perfil', error);
          }
        );
      }
    });
  }
} */






