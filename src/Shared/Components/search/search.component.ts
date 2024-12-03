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
import { DataService } from "../../../app/data.service";
@Component({
  selector: "app-search",
  standalone: true,
  imports: [FormsModule],
  providers: [DataService],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
})
export class SearchComponent implements OnInit {
  data: any = [];
  @Input() endpoint: any;
  @Output() searchResults: any = new EventEmitter<any>();

  searchValue: any = "";
  isTyping: Boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.findTerm();
  }

  findTerm() {
    if (this.searchValue !== "") {
      this.dataService
        .searchForData(this.endpoint, this.searchValue)
        .subscribe((data: any) => {
          this.data = data.data;
          this.searchResults.emit({
            data: this.data,
            isTyping: !this.isTyping,
          });
        });
    } else {
      this.searchResults.emit({ data: [], isTyping: this.isTyping });
    }
  }
}
