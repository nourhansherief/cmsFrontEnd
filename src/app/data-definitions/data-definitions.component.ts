import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-data-definitions',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule],
  providers: [DataService],
  templateUrl: './data-definitions.component.html',
  styleUrl: './data-definitions.component.css'
})
export class DataDefinitionsComponent {

  dataDefinitions: any = [];
  totalDefinitions: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 10;
  newDefinition: any = { name: '', structure: {} };
  editingDefinition: any = null;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }
  navigate(route: string) {
    this.router.navigate([route]);
  }


  ngOnInit(): void {
    this.loadDataDefinitions();
  }

  loadDataDefinitions() {
    this.dataService.getDataDefinitions().subscribe(
      (data) => {
        this.dataDefinitions = data?.data;
        // this.totalDefinitions = data.totalCount;
        // this.currentPage = page;
        // this.totalPages = data.totalPages;

      },
      (error) => console.error(error)
    );
  }

  // onPageChange(page: number) {
  //   this.loadDataDefinitions();
  // }

  editDataDefinition(id: string) {
    this.router.navigate(['content/createDataDefinition', id]);
    // this.dataService.getDataDefinition(id).subscribe(
    //   (data) => this.editingDefinition = data,
    //   (error) => console.error(error)
    // );
  }


  deleteDataDefinition(id: string) {
    this.dataService.deleteDataDefinition(id).subscribe(
      () => this.loadDataDefinitions(),
      (error) => console.error(error)
    );
  }
}
