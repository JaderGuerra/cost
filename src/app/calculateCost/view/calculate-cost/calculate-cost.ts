import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TotalCost } from '../../components/total-cost/total-cost';
import { ListItems } from '../../components/list-items/list-items';
import { Modal } from '../../components/modal/modal';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'calculate-cost',
  imports: [TotalCost, ListItems, Modal],
  templateUrl: './calculate-cost.html',
  styleUrl: './calculate-cost.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalculateCost {
  private modalService = inject(ModalService)

  isOpenModal = computed(() => this.modalService.isOpenModal())

  openModal = () => this.modalService.openModalService()

}
