import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  isAdmin = false;

  constructor(public login: LoginService) { }

  ngOnInit(): void {
    this.updateUserInfo();

    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.updateUserInfo();
      }
    );
  }

  private updateUserInfo() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.isAdmin = this.login.getUserRole() === 'ADMIN';
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}




/* import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  isLoggedIn = false;
  user:any = null;
  isAdmin = false; //para indicar si la persona logueada es admin

  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.isAdmin = this.login.getUserRole() === 'ADMIN'; //para verificar si el usuario tiene rod de admin

    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        this.isAdmin = this.login.getUserRole() === 'ADMIN'; //actualiza isAdmin cuando cambie el estado del login
      }
    );
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

} */
