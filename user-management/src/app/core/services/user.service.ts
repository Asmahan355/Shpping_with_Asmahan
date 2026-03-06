import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


/*
  Pourquoi ce service existe et pourquoi on utilise localStorage :

    - Angular ne garde pas les données en mémoire.
        Quand l’application redémarre ou se recharge,
            les variables sont réinitialisées.

  - Pour éviter de perdre la liste des utilisateurs,
    on les stocke dans le navigateur avec localStorage.

  - Attention : localStorage existe uniquement dans le navigateur.
    Angular peut aussi s’exécuter côté serveur,
    donc on vérifie toujours que le navigateur existe
    avant d’utiliser localStorage.

  En résumé :
  - Mémoire (variables) → temporaire
  - localStorage (navigateur) → persistant
*/


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
      return this.http.post<User>(this.apiUrl,user);
    }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  updateUser(id: number, data: { name: string; email: any }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`,data);
  }
}

