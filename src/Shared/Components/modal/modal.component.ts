import { CommonModule } from '@angular/common';
import { Component, TemplateRef , Input} from '@angular/core';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() modalBtn : any
  @Input() modalDescription : any
  @Input() itemName : any
  @Input() modalFn : any;
  @Input() id : any

  modalRef?: BsModalRef;
  message?: string;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    if (this.modalFn) {
      this.modalFn(this.id); // Only executed when the button in the modal is clicked
    }
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
