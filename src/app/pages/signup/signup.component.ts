import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

  constructor(private userService: UserService,
              private snack: MatSnackBar,
              private router: Router) { } // Inyectar Router aquí

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema', 'success');

        // Redirigir al usuario a la página de login
        this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
        this.snack.open('Ocurrió un error y no se pudo registrar... Recuerde que el nombre de usuario, el e-mail y el teléfono deben ser unicos...', 'Aceptar', {
          duration: 6000
        });
      }
    )
  }

}




/* import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ocurrió un error y no se pudo registrar... Recuerde que el nombre de usuario, el e-mail y el teléfono deben ser unicos...','Aceptar',{
          duration : 6000
        });
      }
    )
  }

} */
