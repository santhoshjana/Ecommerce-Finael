import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class authService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/v1/auth/register`, user);
}

  login(data: any) {
  return this.http.post<any>(`${this.apiUrl}/api/v1/auth/login`, data);
}


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn$.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
