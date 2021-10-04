import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaComponent } from './pages/consulta/consulta.component';
import { NovoComponent } from './pages/novo/novo.component';

const routes: Routes = [
  { path: '', component: ConsultaComponent },
  { path: 'novo', component: NovoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
