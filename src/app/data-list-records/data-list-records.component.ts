import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-data-list-records",
  standalone: true,
  imports: [HttpClientModule, CommonModule],
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
    this.dataService.getRecordsFromDataList(this.dataListId).subscribe(
      (data) => {
        this.records = data.records;
        let recordsIds : any = []
        console.log("records", this.records);
        this.records.map((record : any ) => {
          recordsIds.push(record.record.RECORDID)
        })
        console.log(recordsIds)

        if (this.records.length > 0) {
          this.tableHeaders =
            this.records[0]?.content[0]?.DATA_?.fieldValues.map(
              (field: any) => {
                return field.name;
              }
            );

          // this.tableData = this.records[3]?.content[0]?.DATA_?.fieldValues.map(
          //   (field: any) => {
          //     return field;
          //   }
          // );

          this.tableData = this.records.map((record : any) => {
            return record.content[0]?.DATA_?.fieldValues.map(
              (field: any) => {
                return field;
              }
            )
          })

          console.log(this.tableData)
          // this.tableHeaders.forEach((header : any) => {
          //   //let item = this.tableData.find((data : any) => data.name === header);
          //   // data.find((fields : any) => fields.find((field : any) => field.name === header)
          //   let gg : any = this.tableData
          //   let item = gg.map((data : any) => console.log(data))
          //   console.log(gg)
          //   //console.log(item)
          //   //this.row[header] = item ? item.value['en_US'] || '' : '';
          // })

          this.rows = this.tableData.map((subArray : any, index : any ) => {
            const row: { [key: string]: string } = {};
            this.tableHeaders.forEach(( header : any ) => {
              const item = subArray.find((data : any) => data.name === header);
              row[header] = item ? item.value['en_US'] || '' : '';
              row['recordId'] = recordsIds[index]
            });
            return row;
          });


          console.log(this.rows)
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

  deleteRecord(id: any) {
    this.dataService.deleteRecord(this.dataListId, id).subscribe(
      () => this.loadDataListRecords(),
      (error) => console.error(error)
    );
  }
}
