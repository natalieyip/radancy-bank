import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'accounts/:id', component: AccountComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: '**', component: AccountListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
