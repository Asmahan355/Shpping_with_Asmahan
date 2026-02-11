import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit{
  users: User[] = [];
  message = '';

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
  deleteUser(id:number):void{

    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();

    this.message='Utilisateur supprimé avec succès';

    setTimeout(()=>{
      this.message='';
    },2000);
  }
}
