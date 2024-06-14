import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Generar el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Iniciar sesión y establecer el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);

    // Obtener y almacenar la información del usuario
    this.getCurrentUser().subscribe((user: any) => {
      this.setUser(user);
      this.loginStatusSubjec.next(true); // Notificar a los suscriptores sobre el cambio de estado de inicio de sesión
    });

    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
  }

  // Cerrar sesión y eliminar el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //this.loginStatusSubjec.next(false); // Notificar a los suscriptores sobre el cambio de estado de cierre de sesión
    return true;
  }

  // Obtener el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user?.authorities[0]?.authority;
  }

  // Método para actualizar los datos del usuario
  public updateUser(user: any) {
    return this.http.put(`${baserUrl}/usuarios/${user.id}`, user);
  }
  
}




/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Generar el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Iniciar sesión y establecer el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);

    // Obtener y almacenar la información del usuario
    this.getCurrentUser().subscribe((user: any) => {
      this.setUser(user);
      this.loginStatusSubjec.next(true); // Notificar a los suscriptores sobre el cambio de estado de inicio de sesión
    });

    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
  }

  // Cerrar sesión y eliminar el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //this.loginStatusSubjec.next(false); // Notificar a los suscriptores sobre el cambio de estado de cierre de sesión
    return true;
  }

  // Obtener el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user?.authorities[0]?.authority;
  }
} */

