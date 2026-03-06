import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit{
  users: User[] = [];
  message = '';
  searchTerm = '';
  filteredUsers: User[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
    this.users = users;
    this.filteredUsers = [...users];
  });
  }
  deleteUser(id:number):void{
      console.log("CLICK DELETE", id);

    //confirm() : fonction JavaScript simple => renvoie true si l’utilisateur clique sur OK/ envoie false si l’utilisateur clique sur Annuler
    const confirmation=confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if(!confirmation)
    {
      return;
    }

    this.userService.deleteUser(id).subscribe(() => {
    // Suppression locale pour l'affichage
    this.users = this.users.filter(user => user.id !== id);
    
    this.message='Utilisateur supprimé avec succès';

    setTimeout(() => {
      //console.log('timeout déclenché');
      this.message = '';
    }, 2000);
  });

  }

  filterUsers(): void {
      console.log("filter appelé");
    if (!this.searchTerm || this.searchTerm.trim() === '') {
        this.filteredUsers = [...this.users];
         return;
    }
      this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) //pour savoir si le nom contient ce que l’utilisateur a tapé (includes)
  );
}
  sortUsers():void{
    this.users.sort((a,b)=>a.name.localeCompare(b.name));
  }
}
