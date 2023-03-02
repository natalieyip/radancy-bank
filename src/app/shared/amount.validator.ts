import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function underOneHundred(currentTotalBalance: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (currentTotalBalance - control.value < 100) {
        return { underOneHundred: true }
      }      
        
      return null;
    }
}

export function maxAmountToWithdraw(currentTotalBalance: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const maxAmount = currentTotalBalance * .9
      if (control.value > maxAmount) {
        return { maxAmountToWithdraw: true }
      }      
        
      return null;
    }
}


export function maxAmountToDeposit(control: AbstractControl) {
    if (control.value > 10000) {
      return { maxAmountToDeposit: true };
    }
    return null;
}

export function minAmountToOpen(control: AbstractControl) {
    if (control.value < 100) {
      return { minAmountToOpen: true };
    }
    return null;
}