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
        <img class="brand-logo" src="/assets/poem-poetry-icon.svg" alt="logo" aria-hidden="true" width="50px" height="50px"/>
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
