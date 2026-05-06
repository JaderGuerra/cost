import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TotalCostServices } from '../../services/totalCost-services';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { LucideTrash2, LucideEdit, LucidePlus } from '@lucide/angular';
import type { Product } from '../../types/product';

@Component({
  selector: 'list-items',
  imports: [CurrencyPipe, TitleCasePipe, LucideTrash2, LucideEdit],
  templateUrl: './list-items.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItems {
  private calculatorService = inject(TotalCostServices);

  // listItems = computed(this.calculatorService.listItems)
  listItems = this.calculatorService.listItems

  selectItenToEdit = (item: Product) => this.calculatorService.selectItemForEdit(item)

  removeItemById = (id: string) => this.calculatorService.removeItemById(id)

}
