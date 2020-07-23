import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodeedToken: any;

constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
login(model: any){
  return this.http.post(this.baseurl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('token', user.token);
          this.decodeedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodeedToken);
        }
      })
    );
}

register(model: any){
  return this.http.post(this.baseurl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
