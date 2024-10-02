import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-list-records',
  standalone: true,
  imports: [HttpClientModule , CommonModule],
  providers:[DataService],
  templateUrl: './data-list-records.component.html',
  styleUrl: './data-list-records.component.css'
})
export class DataListRecordsComponent {

  dataListId:any;
  records:any = [];
  tableHeaders: any;
  tableData: any;

  constructor(private router: Router, private route: ActivatedRoute , private dataService: DataService) { }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dataListId = params.get('id');
      this.loadDataListRecords();
    });
  }
  
  navigate(route: string) {
    console.log("00" , this.dataListId)
    this.router.navigate([route, this.dataListId]);
  }

  loadDataListRecords() {
    this.dataService.getRecordsFromDataList(this.dataListId).subscribe(
      (data) => {
        this.records = data;
        console.log("records" , this.records);
        if (this.records.length > 0) {
          this.tableHeaders = Object.keys(this.records[0].data);
          this.tableData = this.records.map((record:any) => record.data);
        }
      },
      (error) => console.error(error)
    );
  }

  editRecord(id:any){
    this.router.navigate(['content/editRecord',this.dataListId , id]);
  }
  
  deleteRecord(id:any){
    this.dataService.deleteRecord(this.dataListId ,id).subscribe(
      () => this.loadDataListRecords(),
      (error) => console.error(error)
    );

  }

  
  

}
