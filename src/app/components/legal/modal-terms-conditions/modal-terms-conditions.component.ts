import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal-terms-conditions',
  standalone: true,
  imports: [],
  templateUrl: './modal-terms-conditions.component.html',
  styleUrl: './modal-terms-conditions.component.scss'
})
export class ModalTermsConditionsComponent {
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
