import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


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

  getUsers(): User[] {
    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addUser(user: User): void {
    if (typeof window === 'undefined') {
      return;
    }

    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  deleteUser(id: number): void {
    if (typeof window === 'undefined') {
      return;
    }

    const users = this.getUsers().filter(u => u.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
