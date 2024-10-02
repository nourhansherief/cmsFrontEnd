import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.css'
})
export class SingleCardComponent {

  @Input() records:any = [];

}
