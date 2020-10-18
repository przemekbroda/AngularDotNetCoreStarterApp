import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripleStateCheckboxComponent } from './triple-state-checkbox.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TripleStateCheckboxComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    TripleStateCheckboxComponent,
  ]
})
export class TripleStateCheckboxModule { }
