import { Component } from '@angular/core';
import { SingleCardComponent } from '../single-card/single-card.component';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-content-example',
  standalone: true,
  imports: [SingleCardComponent , HttpClientModule],
  providers:[DataService],
  templateUrl: './content-example.component.html',
  styleUrl: './content-example.component.css'
})
export class ContentExampleComponent {

  records = [];

  constructor(private dataService:DataService){

  }

  ngOnInit(){
    this.loadDataListRecords("66bdd7908bdda82631567e30");
  }

  loadDataListRecords(id:any) {
    this.dataService.getRecordsFromDataList(id).subscribe(
      (data) => {
        this.records = data;
        console.log("records" , this.records);
        // if (this.records.length > 0) {
        //   this.tableHeaders = Object.keys(this.records[0].data);
        //   this.tableData = this.records.map((record:any) => record.data);
        // }
      },
      (error) => console.error(error)
    );
  }

}
