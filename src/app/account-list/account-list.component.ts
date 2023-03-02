import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from '../shared/account.service';
import { minAmountToOpen } from '../shared/amount.validator';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];
  newAccountForm: FormGroup;
  accountTypes: AccountType[] = [AccountType.checking, AccountType.savings];

  get name() { return this.newAccountForm.get('name'); }
  get type() { return this.newAccountForm.get('type'); }
  get balance() { return this.newAccountForm.get('balance'); }

  constructor(private accountService: AccountService, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts(); 
    this.newAccountForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      balance: new FormControl('100.00', [Validators.required, minAmountToOpen]),
    })
  }

  onCreateNewButton() {
    let newAccount: Account = {
      name: this.newAccountForm.value.name,
      type: this.newAccountForm.value.type,
      balance: +this.newAccountForm.value.balance,
      id: uuidv4()
    };

    this.accountService.createNewAccount(newAccount);
    this.newAccountForm.reset({balance: '100.00'})
  }

  onDelete(id: string) {
    this.accountService.deleteAccount(id);
  }
}

export class Account {
  name: string;
  id: string;
  type: AccountType;
  balance: number;
}

export enum AccountType {
  checking = 'Checking',
  savings = 'Savings'
}


