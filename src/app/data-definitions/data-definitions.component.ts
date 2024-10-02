import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data-definitions',
  standalone: true,
  imports: [CommonModule , HttpClientModule],
  providers:[DataService],
  templateUrl: './data-definitions.component.html',
  styleUrl: './data-definitions.component.css'
})
export class DataDefinitionsComponent {

  dataDefinitions: any = [];

  constructor(private router: Router, private route: ActivatedRoute , private dataService: DataService) { }
  navigate(route: string) {
    this.router.navigate([route]);
  }
  
  newDefinition: any = { name: '', structure: {} };
  editingDefinition: any = null;


  ngOnInit(): void {
    console.log("hereeeeeeeeeeee")
    this.loadDataDefinitions();
  }

  loadDataDefinitions() {
    this.dataService.getDataDefinitions().subscribe(
      (data) => this.dataDefinitions = data,
      (error) => console.error(error)
    );
  }

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
