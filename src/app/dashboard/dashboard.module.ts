import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonTableComponent } from '../common-table/common-table.component';
import { FormsModule } from '@angular/forms';;



@NgModule({
  declarations: [
    CommonTableComponent,],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
