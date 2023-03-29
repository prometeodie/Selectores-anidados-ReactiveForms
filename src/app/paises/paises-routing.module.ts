import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectoresComponent } from './pages/selectores/selectores.component';


const routes: Routes = [{
  path:'',
  children: [
    {
      path:'selector',
      component: SelectoresComponent
  },
  {
    path:'**',
    redirectTo:'selector'
  }
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
