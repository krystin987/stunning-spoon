import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoetryComponent } from '../components/poetry-component/poetry.component';
import { PoemDetailComponent } from '../components/poem-detail/poem-detail.component';

/**
 * Defines the application's routes and configures the RouterModule.
 * The routes array specifies the path for each route and the component that should be rendered.
 */
const routes: Routes = [
  { path: '', component: PoetryComponent }, // Default route
  { path: 'poem/:id', component: PoemDetailComponent }, // Poem details route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

/**
 * The AppRoutingModule is responsible for providing routing configuration throughout the application.
 * It imports RouterModule with the configured routes and exports RouterModule so that it can be used in other modules.
 */

export class AppRoutingModule {}
