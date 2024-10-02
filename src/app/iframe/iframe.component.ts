import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';

@Component({
  selector: 'app-iframe',
  standalone: true,
  imports: [SafeUrlPipe],
  providers:[SafeUrlPipe],
  templateUrl: './iframe.component.html',
  styleUrl: './iframe.component.css'
})
export class IframeComponent {
  @Input() url: string = 'https://cms-two-snowy.vercel.app';
}
