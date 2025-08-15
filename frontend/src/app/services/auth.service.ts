import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginData): Observable<any> {
    return this.http.post('/api/login', data);
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post('/api/register', data);
  }
}
