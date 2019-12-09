import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public user: User;
  public redirectUrl: string;
  public username: string;
  public password: string;

  private authUrl: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  async login(username: string, password: string): Promise<User> {
    try {
      this.username = username;
      this.password = password;
      this.user = await this.getUser();
      const token = btoa(`${username}:${password}`);
      httpOptions.headers = httpOptions.headers.set('Authorization', `Basic ${token}`);
      await this.http.post<User>(`${this.authUrl}/login`, {}, httpOptions).toPromise().then(posts => {    
        this.isLoggedIn = true;
        return Promise.resolve(this.user);
      }).catch(error => console.log(error))
      //this.user = user;

    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }
  getUser(): Promise<User> {
    const token = btoa(`${this.username}:${this.password}`);
    httpOptions.headers = httpOptions.headers.set('Authorization', `Basic ${token}`);
    return this.http.get<User>(`http://localhost:8080/usr/`+this.username, httpOptions).toPromise();
  }
  
  logout() {
    httpOptions.headers = httpOptions.headers.set('Authorization', ``);
    this.isLoggedIn = false;
    this.user = null;
  }
}
