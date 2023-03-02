import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account-list/account-list.component';
import { AccountService } from '../shared/account.service';
import { maxAmountToDeposit, maxAmountToWithdraw, underOneHundred } from '../shared/amount.validator';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account: Account;
  manageAccountForm: FormGroup;
  get withdrawAmount() { return this.manageAccountForm.get('withdrawAmount'); }
  get depositAmount() { return this.manageAccountForm.get('depositAmount'); }

  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService) {  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.account = this.accountService.getAccount(id);

    this.manageAccountForm = this.formBuilder.group({
      withdrawAmount: new FormControl('', [
        underOneHundred(this.account.balance), 
        maxAmountToWithdraw(this.account.balance) 
      ]),
      depositAmount: new FormControl('', [
        maxAmountToDeposit, 
      ]),
    })
  
  }

  onWithdraw(amount: number) {
    this.accountService.updateAccount(this.account.id, {balance: this.account.balance - amount});
  }

  onDeposit(amount: number) {
    this.accountService.updateAccount(this.account.id, {balance: this.account.balance + amount});
  }

  onGoBack() {
    this.router.navigateByUrl("/accounts");
  }
}
