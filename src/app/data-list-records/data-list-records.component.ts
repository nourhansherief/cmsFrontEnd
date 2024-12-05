import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../Shared/Components/loader/loader.component";
import { ModalComponent } from "../../Shared/Components/modal/modal.component";

@Component({
  selector: "app-data-list-records",
  standalone: true,
  imports: [HttpClientModule, CommonModule, LoaderComponent , ModalComponent],
  providers: [DataService],
  templateUrl: "./data-list-records.component.html",
  styleUrl: "./data-list-records.component.css",
})
export class DataListRecordsComponent {
  dataListId: any;
  records: any = [];
  tableHeaders: any;
  tableData: any;
  //row: { [key: string]: string } = {};
  rows: any = {};
  isLoading: Boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dataListId = params.get("id");
      this.loadDataListRecords();
    });
  }

  navigate(route: string) {
    console.log("00", this.dataListId);
    this.router.navigate([route, this.dataListId]);
  }

  loadDataListRecords() {
    console.log("load");
    this.dataService.getRecordsFromDataList(this.dataListId).subscribe(
      (data) => {
        this.isLoading = false;
        this.records = data.records;
        let recordsIds: any = [];
        console.log("records", this.records);
        this.records.map((record: any) => {
          recordsIds.push(record.record.RECORDID);
        });

        if (this.records.length > 0) {
          for (let i = 0; i < this.records.length; i++) {
            if (this.records[i]?.content[i]) {
              let dataObj =
                typeof this.records[i]?.content[i]?.DATA_ == "string"
                  ? JSON.parse(this.records[i]?.content[i]?.DATA_)
                  : this.records[i]?.content[i]?.DATA_;

              this.tableHeaders = dataObj?.fieldValues.map((field: any) => {
                return field?.name
              });
            }
          }
          console.log(this.tableHeaders);

          this.tableData = this.records.map((record: any) => {
            if (record?.content[0] !== undefined) {
              let dataObj =
                typeof record?.content[0]?.DATA_ == "string"
                  ? JSON.parse(record?.content[0]?.DATA_)
                  : record?.content[0]?.DATA_;
              return dataObj?.fieldValues.map((field: any) => {
                return field;
              });
            }
          });

          console.log(this.tableData);

          this.rows = this.tableData.map((subArray: any, index: any) => {
            const row: { [key: string]: string } = {};
            this.tableHeaders.forEach((header: any) => {
              const item = subArray.find(
                (data: any) => data?.name === header
              ) ?? { name: "" };
              row[header] =
                item && typeof item.value === "object"
                  ? item.value["en_US"]
                  : item.value;
              row["recordId"] = recordsIds[index];
            });
            return row;
          });

          console.log(this.rows);
          // this.tableData = this.tableHeaders.map((header : any )=> {
          //   const item = this.tableData.find((data : any) => data.name === header);
          //   return item ? item.value['en_US'] || '' : '';
          // });
        }
      },
      (error) => console.error(error)
    );
  }

  getCellValue(row: any, header: string): any {
    // Assuming row.data is an object with key-value pairs
    return row.data[header];
  }

  editRecord(id: any) {
    this.router.navigate(["content/editRecord", this.dataListId, id]);
  }

  deleteRecord(recordId: any) {
    console.log(recordId);
    this.dataService.deleteRecord(recordId).subscribe(
      () => this.loadDataListRecords(),
      (error) => console.error(error)
    );
  }
}
