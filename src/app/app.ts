import { Component, NgModule, signal } from '@angular/core';
import { CalculateCost } from './calculateCost/view/calculate-cost/calculate-cost';


@Component({
  selector: 'app-root',
  imports: [CalculateCost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('calculate-cost');
}
