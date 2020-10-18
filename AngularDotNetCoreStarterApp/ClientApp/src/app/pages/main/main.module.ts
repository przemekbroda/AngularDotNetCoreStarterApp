import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TripleStateCheckboxModule } from 'src/app/shared/components/triple-state-checkbox/triple-state-checkbox.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [MainComponent, HomeComponent, SettingsComponent, NavbarComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    TripleStateCheckboxModule,
    FormsModule
  ]
})
export class MainModule { }
