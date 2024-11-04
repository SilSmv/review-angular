import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./components/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent,CounterComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '04-counter-app-redux';
}
