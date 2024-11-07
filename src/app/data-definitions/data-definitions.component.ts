import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { SearchComponent } from "../../Shared/Components/search/search.component";
import { PaginationComponent } from "../../Shared/Components/pagination/pagination.component";
import { ConvertXmlToJson } from "../../Utilities/HelperFunctions/xmlToJson";
@Component({
  selector: "app-data-definitions",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    SearchComponent,
    PaginationComponent,
  ],
  providers: [DataService],
  templateUrl: "./data-definitions.component.html",
  styleUrl: "./data-definitions.component.css",
})
export class DataDefinitionsComponent {
  dataDefinitions: any = [];
  newDefinition: any = { name: "", structure: {} };
  editingDefinition: any = null;

  ///
  fullDataDefinition: any = [];
  filteredData: any = [];
  pageNumber: any = 1;
  isTyping: Boolean = false;
  xmlToJson: any = ConvertXmlToJson;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  navigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.loadDataDefinitions();
    this.loadAllDataDefinitions();
  }

  loadDataDefinitions() {
    this.dataService
      .getDataDefinitionsWithPagination(this.pageNumber)
      .subscribe(
        (data) => {
          this.dataDefinitions = data?.data;
          // this.totalDefinitions = data.totalCount;
          // this.currentPage = page;
          // this.totalPages = data.totalPages;
        },
        (error) => console.error(error)
      );
  }

  loadAllDataDefinitions() {
    this.dataService.getDataDefinitions().subscribe((data) => {
      this.fullDataDefinition = data?.data;
    });
  }

  // onPageChange(page: number) {
  //   this.loadDataDefinitions();
  // }

  editDataDefinition(id: string) {
    this.router.navigate(["content/createDataDefinition", id]);
    // this.dataService.getDataDefinition(id).subscribe(
    //   (data) => this.editingDefinition = data,
    //   (error) => console.error(error)
    // );
  }

  deleteDataDefinition(id: string) {
    console.log(id);
    this.dataService.deleteDataDefinition(id).subscribe(
      () => {
        this.filteredData = [];
        this.isTyping = false;
      },
      (error) => console.error(error)
    );
  }

  handleSearchResult(searchData: any) {
    console.log(searchData);
    this.filteredData = searchData?.data;
    this.isTyping = searchData?.isTyping;
    //console.log(this.filteredData)
  }

  handlePaginationResult(pageNumber: any) {
    this.pageNumber = pageNumber;
    this.loadDataDefinitions();
    console.log(pageNumber);
  }
}
