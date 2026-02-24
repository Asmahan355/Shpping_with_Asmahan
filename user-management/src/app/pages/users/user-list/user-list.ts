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

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
  }
  deleteUser(id:number):void{
    //confirm() : fonction JavaScript simple => renvoie true si l’utilisateur clique sur OK/ envoie false si l’utilisateur clique sur Annuler
    const confirmation=confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if(!confirmation)
    {
      return;
    }

    this.userService.deleteUser(id);
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.message='Utilisateur supprimé avec succès';

    setTimeout(() => {
      //console.log('timeout déclenché');
      this.message = '';
    }, 2000);

  }

  filterUsers(): User[] {
  return this.users.filter(user =>
    user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) //pour savoir si le nom contient ce que l’utilisateur a tapé (includes)
  );
}
  sortUsers():void{
    this.users.sort((a,b)=>a.name.localeCompare(b.name));
  }
}
