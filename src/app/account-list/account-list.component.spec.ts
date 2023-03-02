import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AccountService } from '../shared/account.service';
import { Account, AccountListComponent, AccountType } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let mockAccountService: any;
  let accountOne: Account, accountTwo: Account;
  let accounts: Account[];

  beforeEach( () => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['getAccounts', 'updateAccount']);

    accounts = [accountOne, accountTwo];
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

    TestBed.configureTestingModule({
      declarations: [ AccountListComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
      ],
    })

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has required validator', () => {
    mockAccountService.getAccounts.and.returnValue(of(accounts));
    fixture.detectChanges();
    const postDebugElement = fixture.debugElement.query(By.css('#createNewAccountButton'));
    expect(postDebugElement).toBeTruthy()
    console.log(component.accounts);

  });
});
