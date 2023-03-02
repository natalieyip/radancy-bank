import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Account, AccountType } from '../account-list/account-list.component';
import { AccountService } from '../shared/account.service';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let accountOne: Account;
  let accounts: Account[];
  let mockAccountService: any;

  beforeEach(() => {
    accounts = [accountOne];
    accountOne = {
      id: '3',
      name: 'New account',
      type: AccountType.savings,
      balance: 150
    };

    let mockActivatedRoute = {
      snapshot: {
        params: {
          id: accountOne.id
        },
      },
    };


    mockAccountService = jasmine.createSpyObj('AccountService', ['getAccount', 'updateAccount']);

    TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AccountService, useValue: mockAccountService},
      ],
    });
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    mockAccountService.getAccount.and.returnValue(of(accountOne));
    fixture.detectChanges();
    fixture.detectChanges();

  });
});
