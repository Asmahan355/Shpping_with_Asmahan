import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}
