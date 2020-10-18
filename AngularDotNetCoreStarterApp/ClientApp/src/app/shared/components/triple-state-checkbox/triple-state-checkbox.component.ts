import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@Component({
  selector: 'app-triple-state-checkbox',
  templateUrl: './triple-state-checkbox.component.html',
  styleUrls: ['./triple-state-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TripleStateCheckboxComponent),
      multi: true,
    },
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions },
  ],
})
export class TripleStateCheckboxComponent implements OnChanges, ControlValueAccessor {

  ngOnChanges(changes: SimpleChanges): void {
    if (this.value === undefined) { this.value = null; }
  }

  @Input() tape = [null, true, false];

  value: any;

  disabled: boolean;

  private onChange: (val: boolean) => void;
  private onTouched: () => void;

  writeValue(value: any): void {
    this.value = value || this.tape[0];
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  next(): void {
    if (this.value === undefined) { this.value = null; }
    this.onChange(this.value = this.tape[(this.tape.indexOf(this.value) + 1) % this.tape.length]);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
