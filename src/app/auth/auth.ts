import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPERVISOR = 'SUPERVISOR'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  roles: Role[];
}

export interface User {
  username: string;
  token: string;
  roles: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          const user: User = {
            username: response.username,
            token: response.token,
            roles: response.roles
          };
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: Role): boolean {
    const user = this.currentUserValue;
    return user ? user.roles.includes(role) : false;
  }

  hasAnyRole(roles: Role[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.some(role => user.roles.includes(role)) : false;
  }

  hasAllRoles(roles: Role[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.every(role => user.roles.includes(role)) : false;
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ADMIN);
  }

  isSupervisor(): boolean {
    return this.hasRole(Role.SUPERVISOR);
  }

  isUser(): boolean {
    return this.hasRole(Role.USER);
  }
}
