import { Routes } from '@angular/router';
import { UserListComponent } from './pages/users/user-list/user-list';
import { UserDetail } from './pages/users/user-detail/user-detail';
import { UserForm} from './pages/users/user-form/user-form';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetail },
  { path: 'add-user', component: UserForm }
];
