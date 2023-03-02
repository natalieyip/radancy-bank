import { TestBed } from '@angular/core/testing';
import { Account, AccountType } from '../account-list/account-list.component';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let accountOne: Account, accountTwo: Account;

  beforeEach(() => {
    accountOne = {
      id: '3',
      name: 'New account',
      type: AccountType.savings,
      balance: 150
    };

    accountTwo = {
      id: '2',
      name: 'New account 2',
      type: AccountType.checking,
      balance: 1500
    };

    
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should add and deleted a new account ', () => {
    service.createNewAccount(accountOne); 
    expect(service.accounts.length).toBe(1);

    service.deleteAccount(accountOne.id); 
    expect(service.accounts.length).toBe(0);
  });

  it('should update a account ', () => {
    service.createNewAccount(accountOne);
    const retrievedAcc = service.getAccount(accountOne.id); 
    expect(retrievedAcc.balance).toBe(accountOne.balance); 
    
    service.updateAccount(accountOne.id, {balance: 100}); 
    const updatedAcc = service.getAccount(accountOne.id); 
    expect(updatedAcc.balance).toBe(100);
  });

  it('should retrieve account', () => {
    service.createNewAccount(accountOne);
    const retrievedAcc = service.getAccount(accountOne.id); 
    expect(retrievedAcc.name).toBe(accountOne.name);
  });

  it('should add a new account account', () => {
    service.createNewAccount(accountOne);
    service.createNewAccount(accountTwo)
    const retrievedAccounts = service.getAccounts(); 
    expect(retrievedAccounts.length).toBe(2);
    expect(retrievedAccounts[0].name).toBe(accountOne.name);
    expect(retrievedAccounts[1].name).toBe(accountTwo.name);
  });
});
