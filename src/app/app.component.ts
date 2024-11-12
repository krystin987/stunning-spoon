import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoetryComponent } from './poetry/poetry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoetryComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
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
