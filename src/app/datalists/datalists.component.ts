import { Component, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from "../../Shared/Components/search/search.component";
import { PaginationComponent } from "../../Shared/Components/pagination/pagination.component";
import { ConvertXmlToJson } from "../../Utilities/HelperFunctions/xmlToJson";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-datalists",
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    SearchComponent,
    PaginationComponent,
  ],
  providers: [DataService],
  templateUrl: "./datalists.component.html",
  styleUrl: "./datalists.component.css",
})
export class DatalistsComponent {
  dataLists: any = [];
  fullDataList: any = [];
  filteredData: any = [];
  pageNumber: any = 1;
  isTyping: Boolean = false;
  showNameInput: Boolean = false;
  nameValue: any = "";
  editingName: any = "";
  xmlToJson: any = ConvertXmlToJson;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  newDataList: any = { name: "", dataDefinitionId: {} };

  ngOnInit(): void {
    console.log("hereeeeeeeeeeee");
    this.loadDataLists();
    this.loadAllDataLists();
    console.log(this.dataLists);
  }

  ngOnChanges(): void {
    //this.loadDataLists();
  }

  loadDataLists() {
    this.dataService.getDataListWithPagination(this.pageNumber).subscribe(
      (data) => (this.dataLists = data.data),
      (error) => console.error(error)
    );
  }

  loadAllDataLists() {
    this.dataService.getDataLists().subscribe((data) => {
      this.fullDataList = data?.data;
    });
  }

  editDataList(id: string) {
    this.router.navigate(["content/dataListRecords", id]);
    // this.dataService.getDataDefinition(id).subscribe(
    //   (data) => this.editingDefinition = data,
    //   (error) => console.error(error)
    // );
  }

  editDataListName(name: string, recordSetId: any) {
    this.showNameInput = true;
    this.editingName = name;
    if (name && this.nameValue) {
      let dataListObj = {
        RECORDSETID: recordSetId,
        NAME: this.nameValue,
      };
      console.log(dataListObj);

      this.dataService.updateDataListName(dataListObj).subscribe(() => {
        this.nameValue = "";
        this.loadAllDataLists();
      });
    }
  }

  deleteDataList(id: string) {
    this.dataService.deleteDataList(id).subscribe(
      () => {
        this.filteredData = [];
        this.pageNumber = 1;
        this.loadDataLists();
      },
      (error) => console.error(error)
    );
  }

  handleSearchResult(searchData: any) {
    this.filteredData = searchData?.data;
    this.isTyping = searchData?.isTyping;
  }

  handlePaginationResult(pageNumber: any) {
    this.pageNumber = pageNumber;
    this.loadDataLists();
    console.log(pageNumber);
  }
}
