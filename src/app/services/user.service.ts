import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }

    public updateUser(formData: any) {                                              //agregado
      const token = localStorage.getItem('token');                                  //agregado
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);    //agregado
      return this.httpClient.put(`${baserUrl}/usuario/`, formData, { headers });    //agregado
    }                                                                               //agregado

}
