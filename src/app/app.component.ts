import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoetryComponent } from './components/poetry/poetry.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoetryComponent, NgOptimizedImage],
  template: `
    <main>
      <header class="app-header">
        <div class="header-container">
<!--          <img class="brand-logo" src="/assets/poem-poetry-icon.svg" alt="logo" aria-hidden="true" width="50px"-->
<!--               height="50px"/>-->
          <div class="header-text">
            <h1 class="app-title">Poetry Viewer</h1>
            <p class="app-tagline">Discover and explore timeless poetry</p>

          </div>
        </div>
      </header>
      <section class="content">
        <app-poetry></app-poetry>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poetry';
}
