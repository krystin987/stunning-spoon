import { Component } from '@angular/core';
import { PoetryComponent } from './components/poetry-component/poetry.component';

@Component({
  selector: 'app-root',
  imports: [PoetryComponent],
  template: `
    <main>
      <header class="app-header">
        <div class="header-container">
          <div class="header-text">
            <h1 class="app-title">Poetry Viewer</h1>
            <p class="app-tagline">Discover and Explore Timeless Poetry</p>
          </div>
        </div>
      </header>
      <section class="content">
        <app-poetry></app-poetry>
      </section>
    </main>
  `,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poetry';
}
