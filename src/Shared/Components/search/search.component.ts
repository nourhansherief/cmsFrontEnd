import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConvertXmlToJson } from "../../../Utilities/HelperFunctions/xmlToJson";
@Component({
  selector: "app-search",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
})
export class SearchComponent implements OnChanges {
  @Input() data: any;
  @Output() searchResults: any = new EventEmitter<any>();

  searchValue: any = "";
  isTyping: Boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.findTerm();
  }

  findTerm() {
    if (!this.searchValue)
      return this.searchResults.emit({ data: [], isTyping: this.isTyping });
    let arr: any = [];
    this.data.forEach((res: any) => {
      if (
        ConvertXmlToJson(res.NAME)
          .trim()
          .toLowerCase()
          .includes(this.searchValue.trim().toLowerCase())
      ) {
        arr.push(res);
      }
    });

    this.searchResults.emit({ data: arr, isTyping: !this.isTyping });
  }
}
