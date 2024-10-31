import { CommonModule } from '@angular/common';
import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent , PaginationModule} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule , FormsModule , PaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  contentArray: any[] = new Array(90).fill('');
  @Input() data : any
  @Input() dataLength : any
  @Output() pageNum : any = new EventEmitter<any>()

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.dataLength)
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNum.emit(event.page)
  }
}
