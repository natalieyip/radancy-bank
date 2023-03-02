import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../shared/account.service';
import { Account, AccountListComponent, AccountType } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let mockAccountService: any;
  let accountOne: Account;
  let accounts: Account[];

  beforeEach(async () => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['getAccounts', 'updateAccount']);

    accounts = [accountOne];
    accountOne = {
      id: '3',
      name: 'New account',
      type: AccountType.savings,
      balance: 150
    };

    await TestBed.configureTestingModule({
      declarations: [ AccountListComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
