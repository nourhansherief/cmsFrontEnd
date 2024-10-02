import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-datalists',
  standalone: true,
  imports: [CommonModule , HttpClientModule] ,
  providers:[DataService],
  templateUrl: './datalists.component.html',
  styleUrl: './datalists.component.css'
})

export class DatalistsComponent {

  dataLists: any = [];

  constructor(private router: Router, private route: ActivatedRoute , private dataService: DataService) { }

  navigate(route: string) {
    this.router.navigate([route]);
  }
  
  newDataList: any = { name: '', dataDefinitionId: {} };


  ngOnInit(): void {
    console.log("hereeeeeeeeeeee")
    this.loadDataLists();
  }

  loadDataLists() {
    this.dataService.getDataLists().subscribe(
      (data) => this.dataLists = data,
      (error) => console.error(error)
    );
  }

  editDataList(id: string) {
    this.router.navigate(['content/dataListRecords', id]);
    // this.dataService.getDataDefinition(id).subscribe(
    //   (data) => this.editingDefinition = data,
    //   (error) => console.error(error)
    // );
  }

  deleteDataList(id: string) {
    this.dataService.deleteDataList(id).subscribe(
      () => this.loadDataLists(),
      (error) => console.error(error)
    );
  }

}
