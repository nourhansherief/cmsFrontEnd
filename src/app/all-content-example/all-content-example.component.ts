import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-content-example',
  standalone: true,
  imports: [HttpClientModule],
  providers:[DataService],
  templateUrl: './all-content-example.component.html',
  styleUrl: './all-content-example.component.css'
})
export class AllContentExampleComponent {

  data:any = {};

  constructor(private dataService:DataService){

  }

  ngOnInit(){
    this.getContent();
  }

  getContent() {
    this.dataService.getWebContent('web_').subscribe(
      (data) => {
        this.data = data;
        console.log("d" , this.data);
        // console.log("records" , this.records);
        // if (this.records.length > 0) {
        //   this.tableHeaders = Object.keys(this.records[0].data);
        //   this.tableData = this.records.map((record:any) => record.data);
        // }
      },
      (error) => console.error(error)
    );
  }
}
