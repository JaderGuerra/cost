import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isOpenModal = signal(false)
  closeModalService = () => this.isOpenModal.set(false)
  openModalService = () => this.isOpenModal.set(true)
}
