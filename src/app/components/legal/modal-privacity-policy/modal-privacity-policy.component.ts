import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal-privacity-policy',
  standalone: true,
  imports: [],
  templateUrl: './modal-privacity-policy.component.html',
  styleUrl: './modal-privacity-policy.component.scss'
})
export class ModalPrivacityPolicyComponent {
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
