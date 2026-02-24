import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';


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

  private storageKey = 'users';

  constructor() {
    // Si on est dans le navigateur
    if (typeof window !== 'undefined') {

      // Si aucun utilisateur n'est encore stocké
      if (!localStorage.getItem(this.storageKey)) {
        const users: User[] = [
          { id: 1, name: 'Alice', email: 'alice@test.com' },
          { id: 2, name: 'Bob', email: 'bob@test.com' }
        ];

        localStorage.setItem(this.storageKey, JSON.stringify(users));
      }
    }
  }

  getUsers(): Observable<User[]> {
    if (typeof window === 'undefined') {
      return of([]);
    }

    const users=JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(users);
  }

  addUser(user: User): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.getUsers().subscribe(users=>{
      users.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    });
    
  }

  deleteUser(id: number): void {
    if (typeof window === 'undefined') {
      return;
    }

    const users = this.getUsers().subscribe(users=>{
    const updateUsers=users.filter(u => u.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updateUsers));
    });
  }
getUserById(id: number): Observable<User | undefined> {

  return new Observable(observer => {

    this.getUsers().subscribe(users => {
      const user = users.find(u => u.id === id);
      observer.next(user);
      observer.complete();
    });

  });
}
updateUser(id: number, data: { name: string; email: any }): void {

  this.getUsers().subscribe(users => {

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users[i].name = data.name;
        users[i].email = data.email;
        break;
      }
    }

    localStorage.setItem(this.storageKey, JSON.stringify(users));

  });
}
}
