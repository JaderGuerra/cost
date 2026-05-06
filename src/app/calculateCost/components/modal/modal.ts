import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, signal } from '@angular/core';
import { ModalService } from '../../services/modal-service';
import { InputFile } from "../input-file/input-file";
import { TotalCostServices } from '../../services/totalCost-services';
import { Switch } from '../switch/switch';

@Component({
  selector: 'modal',
  imports: [InputFile, Switch],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  @Input() titleModal: string = ''
  private modalService = inject(ModalService)
  private totalCostServices = inject(TotalCostServices)

  constructor() {
    // Every time selectedItem changes in the service, we update the local inputs
    effect(() => {
      const item = this.totalCostServices.selectedItem();
      if (item) {
        this.itemName.set(item.name);
        this.itemPrice.set(item.price);
        this.itemCount.set(item.count);
      }
    });
  }

  closeModal = () => this.modalService.closeModalService()

  itemName = signal('');
  itemPrice = signal(0);
  itemCount = signal(1);
  keepOpenModal = this.totalCostServices.keepOpenModal

  save() {
    const newItem = {
      id: this.totalCostServices.selectedItem()?.id,
      name: this.itemName(),
      price: this.itemPrice(),
      count: this.itemCount()
    }

    this.totalCostServices.addNuewItemToTable(newItem)
    if (!this.keepOpenModal()) this.closeModal();

    this.resetState()
  }

  resetState() {
    this.itemCount.set(1)
    this.itemName.set('')
    this.itemPrice.set(0)
  }

}
