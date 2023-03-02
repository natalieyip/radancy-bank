import { Injectable } from '@angular/core';
import { Account } from '../account-list/account-list.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[] = [];
  
  constructor() { }

  getAccount(id: string) {
    let accountIndex = this.accounts.findIndex(t => t.id === id);
    return this.accounts[accountIndex];
  }

  getAccounts() {
    return this.accounts; 
  }

  createNewAccount(account: Account) {
    this.accounts.push(account); 
  }

  updateAccount(id: string, updatedAccountFields: Partial<Account>) {
    const account = this.getAccount(id)
    Object.assign(account, updatedAccountFields)
  }

  deleteAccount(id: string) {
    const accnt = this.accounts.findIndex(a => a.id === id); 
    if (accnt === -1) {
      return;
    }

    this.accounts.splice(accnt, 1);
  }
}
