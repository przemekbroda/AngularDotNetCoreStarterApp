import { Attribute, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRepeatedValueValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: RepeatedValueValidatorDirective,
      multi: true
    }
  ]

})
export class RepeatedValueValidatorDirective implements Validator, OnDestroy {

  private passwordFieldValueSubscription: Subscription;

  constructor(@Attribute('appRepeatPasswordValidator') private passwordFieldName: string) { }

  ngOnDestroy(): void {
    this.passwordFieldValueSubscription?.unsubscribe();
  }

  validate(control: AbstractControl): ValidationErrors {
    if (control === null) {
      return null;
    }

    const passwordField = control.root.get(this.passwordFieldName);

    if (!this.passwordFieldValueSubscription) {
      this.passwordFieldValueSubscription = passwordField.valueChanges.subscribe(v => {
        control.updateValueAndValidity();
      });
    }

    return passwordField.value && passwordField.value === control.value ? null : {
      repeatPasswordValidator: {
        valid: false
      }
    };
  }

}
