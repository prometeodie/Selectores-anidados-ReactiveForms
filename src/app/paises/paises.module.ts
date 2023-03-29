import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectoresComponent } from './pages/selectores/selectores.component';
import { PaisesRoutingModule } from './paises-routing.module';



@NgModule({
  declarations: [SelectoresComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule
  ]
})
export class PaisesModule { }
