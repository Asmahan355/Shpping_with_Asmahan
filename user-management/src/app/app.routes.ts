import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from './pages/users/user-list/user-list';
import { UserDetail } from './pages/users/user-detail/user-detail';
import { UserForm } from './pages/users/user-form/user-form';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserList },
  { path: 'users/:id', component: UserDetail },
  { path: 'add-user', component: UserForm }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

