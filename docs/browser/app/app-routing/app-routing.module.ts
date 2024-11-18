import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoetryComponent } from '../components/poetry/poetry.component';
import { PoemDetailComponent } from '../components/poem-detail/poem-detail.component';

const routes: Routes = [
  { path: '', component: PoetryComponent }, // Default route
  { path: 'poem/:id', component: PoemDetailComponent }, // Poem details route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
