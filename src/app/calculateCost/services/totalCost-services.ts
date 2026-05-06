import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { Product } from '../types/product';
import { ModalService } from './modal-service';


@Injectable({
  providedIn: 'root'
})
export class TotalCostServices {

  private modalService = inject(ModalService)

  history = signal<{ date: string; items: Product[]; total: number }[]>(this.loadHistory());

  constructor() {
    //Store the products when they change.

    effect(() => {
      localStorage.setItem('local_products', JSON.stringify(this.listItems()));
    });

    //Automatically save the history when it changes
    effect(() => {
      localStorage.setItem('my_history_products', JSON.stringify(this.history()));
    });
  }

  private saveToLocalStorage = () => {
    const saved = localStorage.getItem('local_products');
    return saved ? JSON.parse(saved) : [];
  }

  listItems = signal<Product[]>(this.saveToLocalStorage())
  selectedItem = signal<Product | null>(null);
  keepOpenModal = signal(false)

  private loadHistory(): { date: string; items: Product[]; total: number }[] {
    const saved = localStorage.getItem('my_history_products');
    return saved ? JSON.parse(saved) : [];
  }

  addNuewItemToTable = (product: Product) => {
    if (product.id) {
      this.listItems.update(items =>
        items.map(item => item.id === product.id ? this.multiplierValue(product) : item)
      );
    } else {
      const newItem = {
        ...product,
        id: crypto.randomUUID()
      };
      const newProduct = this.multiplierValue(newItem);
      this.listItems.update(current => [...current, newProduct]);

    }

    this.selectedItem.set(null);
  }

  saveCurrentListToHistory() {
    // Validate the list is not empty before saving
    if (this.listItems().length === 0) return;

    const today = new Date().toLocaleDateString();
    const currentHistory = this.history();

    // Check if there is an existing purchase record for today
    const existingDayIndex = currentHistory.findIndex(record => record.date === today);

    if (existingDayIndex !== -1) {
      // UPDATE EXISTING DAY RECORD:
      this.history.update(historyList => {
        const updatedHistory = [...historyList];
        const existingDay = updatedHistory[existingDayIndex];

        // Merge previous items with the new ones from the afternoon
        const mergedItems = [...existingDay.items, ...this.listItems()];
        // Sum previous total with the new total
        const mergedTotal = existingDay.total + this.total();

        updatedHistory[existingDayIndex] = {
          ...existingDay,
          items: mergedItems,
          total: mergedTotal
        };

        return updatedHistory;
      });
    } else {
      // CREATE NEW DAY RECORD: First purchase of the day
      const newList = {
        date: today,
        items: this.listItems(),
        total: this.total()
      };
      this.history.update(current => [newList, ...current]);
    }

    // Clear the current list for the next purchase
    this.listItems.set([]);
  }

  multiplierValue(product: Product): Product {
    return {
      ...product,
      price: product.count * product.price
    };
  }

  selectItemForEdit = (item: Product) => {
    console.log(item)
    this.modalService.openModalService()
    this.selectedItem.set(item)
  };

  removeItemById = (id: string) => {
    if (!id) return

    this.listItems.update(items => items.filter(item => item.id !== id));
  }

  total = computed(() => {
    return this.listItems().reduce((acc, item) => acc + item.price, 0);
  });


}
