import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TotalCostServices } from '../../services/totalCost-services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'total-cost',
  imports: [CurrencyPipe],
  templateUrl: './total-cost.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCost {
  private calculatorService = inject(TotalCostServices);

  totalCost = computed(this.calculatorService.total)

  listItems = this.calculatorService.listItems

  saveCurrentHistory() {
    this.calculatorService.saveCurrentListToHistory()
  }
}
