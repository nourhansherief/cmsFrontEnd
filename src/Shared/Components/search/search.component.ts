import { Component, EventEmitter, Input, OnChanges, Output , ChangeDetectorRef, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnChanges{
  @Input() data : any
  @Output() searchResults : any = new EventEmitter<any>()

  searchValue : any = ''

  constructor(private cdr : ChangeDetectorRef){}

  ngOnChanges(): void {
    this.findTerm();
  }

  findTerm() {
    if(!this.searchValue) return this.searchResults.emit([])
    let arr : any = []
    this.data.forEach((res : any) => {
      if(res.NAME.trim().toLowerCase().includes(this.searchValue)){
        arr.push(res)
      }
    })

    this.searchResults.emit(arr)
  }
}
